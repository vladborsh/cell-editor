import { MoveMouse } from '../store/actions/move-mouse.action';
import { SaveHistory } from '../store/actions/save-history.action';
import { UpdateColor } from '../store/actions/update-color.action';
import { UpdateCells } from '../store/actions/update-cells.action';
import { Canvas } from '../canvas';
import { Tools } from '../enums/tools.enum';
import { Vector } from '../interfaces/vector.interface';
import { Store } from '../store/store';
import { BresenhamEllipseAlgorithm } from '../renderering/bresenham-ellipse-algorithm';
import { EllipseTool } from '../tools/ellipse.tool';
import { FillTool } from '../tools/fill.tool';
import { LineTool } from '../tools/line.tool';

export class CursorListener {
  private isMousePressed = false;

  constructor(
    private store: Store,
    private canvas: Canvas,
    private bresenhamEllipseAlgorithm: BresenhamEllipseAlgorithm,
    private ellipseTool: EllipseTool,
    private fillTool: FillTool,
    private lineTool: LineTool,
  ) {}

  public install(): void {
    this.canvas.subscribe('mousedown', (event) => this.onMouseDown(event as MouseEvent));
    this.canvas.subscribe('mousemove', (event) => this.onMouseMove(event as MouseEvent));
    this.canvas.subscribe('mouseup', () => this.onMouseUp());
  }

  private onMouseDown(event: MouseEvent): void {
    const { top, left } = this.canvas.canvas.getBoundingClientRect();
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

    this.movePressedMouse({ x, y });

    this.isMousePressed = true;
  }

  private onMouseMove(event: MouseEvent): void {
    const { top, left } = this.canvas.canvas.getBoundingClientRect();
    const { cellSize } = this.store.getSnapshot();
    this.store.dispatch(
      new MoveMouse({
        x: event.x - left,
        y: event.y - top,
      })
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
  }

  private movePressedMouse({ x, y }: Vector): void {
    const { tool, brushSize, grid } = this.store.getSnapshot();
    if (tool === Tools.BRUSH) {
      if (brushSize === 1) {
        this.store.dispatch(new UpdateCells([{ x, y }]));
      } else {
        this.store.dispatch(new UpdateCells(
          this.bresenhamEllipseAlgorithm.getRenderPoints(
            { x, y },
            { x: brushSize - 1, y: brushSize - 1 }
          )
        ));
      }
    }
    if (tool === Tools.PIPET) {
      this.store.dispatch(new UpdateColor(grid[x][y]));
    }
    if (tool === Tools.ELLIPSE) {
      this.ellipseTool.onMove({ x, y });
    }
    if (tool === Tools.LINE) {
      this.lineTool.onMove({ x, y });
    }
  }
}
