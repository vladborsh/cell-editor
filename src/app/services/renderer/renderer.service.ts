import { Injectable } from '@angular/core';

import { Tools } from '../../enums/tools.enum';
import { CanvasService } from '../canvas/canvas.service';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class RendererService {
  constructor(private store: StoreService, private canvas: CanvasService) {}

  public render(): void {
    this.clearCanvas();
    this.drawGrid();
    this.drawToolTemporalLayer();
    this.drawBrush();
    requestAnimationFrame(() => this.render.bind(this)());
  }

  private clearCanvas(): void {
    if (!this.canvas.context) {
      return;
    }

    const state = this.store.getSnapshot();
    this.canvas.context.fillStyle = `#${state.defaultColor}`;
    this.canvas.context.fillRect(0, 0, state.canvasWidth, state.canvasHeight);
  }

  private drawBrush(): void {
    if (!this.canvas.context) {
      return;
    }

    const {
      cursorPosition: { x, y },
      brushSize,
      cellSize,
      tool,
    } = this.store.getSnapshot();

    this.canvas.context.strokeStyle = '#222';

    if (tool === Tools.BRUSH) {
      this.canvas.context.beginPath();
      this.canvas.context.arc(x, y, brushSize * cellSize, 0, 2 * Math.PI);
      this.canvas.context.stroke();
    }

    if (tool === Tools.PIPET) {
      this.canvas.context.beginPath();
      this.canvas.context.arc(x, y, cellSize, 0, 2 * Math.PI);
      this.canvas.context.stroke();
    }

    if (
      tool === Tools.ELLIPSE ||
      tool === Tools.FILL ||
      tool === Tools.LINE ||
      tool === Tools.RECTANGLE
    ) {
      this.canvas.context.beginPath();
      this.canvas.context.arc(x, y, cellSize / 2, 0, 2 * Math.PI);
      this.canvas.context.stroke();
    }
  }

  private drawGrid(): void {
    if (!this.canvas.context) {
      return;
    }

    const { grid, cellSize, cellNumberX, cellNumberY } = this.store.getSnapshot();
    for (let i = 0; i < cellNumberX; i++) {
      for (let j = 0; j < cellNumberY; j++) {
        if (!grid[i][j]) {
          continue;
        }
        this.canvas.context.fillStyle = `#${grid[i][j]}`;
        this.canvas.context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }

    this.canvas.context.lineWidth = 1;
  }

  private drawToolTemporalLayer(): void {
    if (!this.canvas.context) {
      return;
    }

    const { toolTemporalLayer, cellSize, color } = this.store.getSnapshot();

    if (!toolTemporalLayer || !toolTemporalLayer.length) {
      return;
    }

    this.canvas.context.fillStyle = `#${color}`;

    for (const { x, y } of toolTemporalLayer) {
      this.canvas.context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}
