import { Injectable } from '@angular/core';
import { CanvasBoardState } from 'src/app/interfaces/global-state.interface';

import { Tools } from '../../enums/tools.enum';

@Injectable({
  providedIn: 'root',
})
export class RendererService {
  public render(
    canvasContext: CanvasRenderingContext2D,
    canvasState: CanvasBoardState,
    isPreviewMode = false,
  ): void {
    this.clearCanvas(canvasContext, canvasState);
    this.drawGrid(canvasContext, canvasState, isPreviewMode);
    if (!isPreviewMode) {
      this.drawToolTemporalLayer(canvasContext, canvasState);
      this.drawBrush(canvasContext, canvasState);
    }
  }

  private clearCanvas(
    canvasContext: CanvasRenderingContext2D,
    canvasState: CanvasBoardState,
  ): void {
    if (!canvasContext) {
      return;
    }

    canvasContext.fillStyle = `#${canvasState.defaultColor}`;
    canvasContext.fillRect(0, 0, canvasState.canvasWidth, canvasState.canvasHeight);
  }

  private drawBrush(canvasContext: CanvasRenderingContext2D, canvasState: CanvasBoardState): void {
    if (!canvasContext) {
      return;
    }

    const {
      cursorPosition: { x, y },
      brushSize,
      cellSize,
      tool,
    } = canvasState;

    canvasContext.strokeStyle = '#222';

    if (tool === Tools.BRUSH || tool === Tools.ERASER) {
      canvasContext.beginPath();
      canvasContext.arc(x, y, brushSize * cellSize, 0, 2 * Math.PI);
      canvasContext.stroke();
    }

    if (tool === Tools.PIPET) {
      canvasContext.beginPath();
      canvasContext.arc(x, y, cellSize, 0, 2 * Math.PI);
      canvasContext.stroke();
    }

    if (
      tool === Tools.ELLIPSE ||
      tool === Tools.FILL ||
      tool === Tools.LINE ||
      tool === Tools.RECTANGLE
    ) {
      canvasContext.beginPath();
      canvasContext.arc(x, y, cellSize / 2, 0, 2 * Math.PI);
      canvasContext.stroke();
    }
  }

  private drawGrid(
    canvasContext: CanvasRenderingContext2D,
    canvasState: CanvasBoardState,
    isPreviewMode = false,
  ): void {
    if (!canvasContext) {
      return;
    }

    const { grid, cellSize, cellNumberX, cellNumberY, layers } = canvasState;

    if (isPreviewMode) {
      const cellChangedSize = 3;

      for (let i = 0; i < cellNumberX; i++) {
        for (let j = 0; j < cellNumberY; j++) {
          if (!grid[0][i][j]) {
            continue;
          }
          canvasContext.fillStyle = `#${grid[0][i][j]}`;
          canvasContext.fillRect(
            i * cellChangedSize,
            j * cellChangedSize,
            cellChangedSize,
            cellChangedSize,
          );
        }
      }
    } else {
      for (let layer = 0; layer < grid.length; layer++) {
        if (!layers[layer].isShown || layers[layer].opacity === 0) {
          continue;
        }
        canvasContext.globalAlpha = layers[layer].opacity / 100;
        for (let i = 0; i < cellNumberX; i++) {
          for (let j = 0; j < cellNumberY; j++) {
            if (!grid[layer][i][j]) {
              continue;
            }
            canvasContext.fillStyle = `#${grid[layer][i][j]}`;
            canvasContext.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          }
        }
      }
      canvasContext.globalAlpha = 1;
      canvasContext.lineWidth = 1;
    }
  }

  private drawToolTemporalLayer(
    canvasContext: CanvasRenderingContext2D,
    canvasState: CanvasBoardState,
  ): void {
    if (!canvasContext) {
      return;
    }

    const { toolTemporalLayer, cellSize, color } = canvasState;

    if (!toolTemporalLayer || !toolTemporalLayer.length) {
      return;
    }

    canvasContext.fillStyle = `#${color}`;

    for (const { x, y } of toolTemporalLayer) {
      canvasContext.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}
