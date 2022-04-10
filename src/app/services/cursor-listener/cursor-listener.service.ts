import { Injectable } from '@angular/core';

import { Tools } from '../../enums/tools.enum';
import { Vector } from '../../interfaces/vector.interface';
import { MoveMouse } from '../../store/actions/move-mouse.action';
import { SaveHistory } from '../../store/actions/save-history.action';
import { UpdateCells } from '../../store/actions/update-cells.action';
import { UpdateColor } from '../../store/actions/update-color.action';
import { UpdateZoom } from '../../store/actions/update-zoom.action';
import { BresenhamEllipseAlgorithmService } from '../bresenham-ellipse-algorithm/bresenham-ellipse-algorithm.service';
import { CanvasService } from '../canvas/canvas.service';
import { EllipseToolService } from '../ellipse-tool/ellipse-tool.service';
import { FillToolService } from '../fill-tool/fill-tool.service';
import { LineToolService } from '../line-tool/line-tool.service';
import { RectangleToolService } from '../rectangle-tool/rectangle-tool.service';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class CursorListenerService {
  private isMousePressed = false;

  constructor(
    private store: StoreService,
    private canvas: CanvasService,
    private bresenhamEllipseAlgorithm: BresenhamEllipseAlgorithmService,
    private ellipseTool: EllipseToolService,
    private fillTool: FillToolService,
    private lineTool: LineToolService,
    private rectangleTool: RectangleToolService,
  ) {}

  public install(): void {
    this.canvas.subscribe('mousedown', event => this.onMouseDown(event as MouseEvent));
    this.canvas.subscribe('mousemove', event => this.onMouseMove(event as MouseEvent));
    this.canvas.subscribe('mouseup', () => this.onMouseUp());
    this.canvas.subscribe('wheel', (event: WheelEvent) => {
      event.preventDefault();

      const { cellSize } = this.store.getSnapshot();
      const scale = cellSize + event.deltaY * -0.01;

      this.store.dispatch(new UpdateZoom(Math.min(Math.max(1, scale), 25)));
    });
  }

  private onMouseDown(event: MouseEvent): void {
    const { top, left } = this.canvas.getBoundingRect();
    const { cellSize, tool } = this.store.getSnapshot();
    const x = Math.floor((event.x - left) / cellSize);
    const y = Math.floor((event.y - top) / cellSize);

    if (tool === Tools.ELLIPSE) {
      this.ellipseTool.onSetup({ x, y });
    }
    if (tool === Tools.FILL) {
      this.fillTool.onSetup({ x, y });
    }
    if (tool === Tools.LINE) {
      this.lineTool.onSetup({ x, y });
    }
    if (tool === Tools.RECTANGLE) {
      this.rectangleTool.onSetup({ x, y });
    }

    this.movePressedMouse({ x, y });

    this.isMousePressed = true;
  }

  private onMouseMove(event: MouseEvent): void {
    const { top, left } = this.canvas.getBoundingRect();
    const { cellSize } = this.store.getSnapshot();
    this.store.dispatch(
      new MoveMouse({
        x: event.x - left,
        y: event.y - top,
      }),
    );
    if (!this.isMousePressed) {
      return;
    }
    this.movePressedMouse({
      x: Math.floor((event.x - left) / cellSize),
      y: Math.floor((event.y - top) / cellSize),
    });
  }

  private onMouseUp(): void {
    const { tool } = this.store.getSnapshot();

    this.isMousePressed = false;
    this.store.dispatch(new SaveHistory());

    if (tool === Tools.ELLIPSE) {
      this.ellipseTool.onDispose();
    }
    if (tool === Tools.LINE) {
      this.lineTool.onDispose();
    }
    if (tool === Tools.RECTANGLE) {
      this.rectangleTool.onDispose();
    }
  }

  private movePressedMouse({ x, y }: Vector): void {
    const { tool, brushSize, grid, activeLayer } = this.store.getSnapshot();
    if (tool === Tools.BRUSH) {
      if (brushSize === 1) {
        this.store.dispatch(new UpdateCells([{ x, y }]));
      } else {
        this.store.dispatch(
          new UpdateCells(
            this.bresenhamEllipseAlgorithm.getRenderPoints(
              { x, y },
              { x: brushSize - 1, y: brushSize - 1 },
            ),
          ),
        );
      }
    }
    if (tool === Tools.PIPET) {
      if (grid[activeLayer][x][y]) {
        this.store.dispatch(new UpdateColor(grid[activeLayer][x][y]));
      }
    }
    if (tool === Tools.ELLIPSE) {
      this.ellipseTool.onMove({ x, y });
    }
    if (tool === Tools.LINE) {
      this.lineTool.onMove({ x, y });
    }
    if (tool === Tools.RECTANGLE) {
      this.rectangleTool.onMove({ x, y });
    }
  }
}
