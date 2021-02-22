import { MoveMouse } from '../store/actions/move-mouse.action';
import { SaveHistory } from '../store/actions/save-history.action';
import { SetColor } from '../store/actions/set-color.action';
import { UpdateCell } from '../store/actions/update-cell.action';
import { Canvas } from '../canvas';
import { Tools } from '../enums/tools.enum';
import { Vector } from '../interfaces/vector.interface';
import { Store } from '../store/store';

export class CursorListener {
  private isMousePressed = false;

  constructor(private store: Store, private canvas: Canvas) {}

  public install(): void {
    this.canvas.subscribe('mousedown', (event) => this.onMouseDown(event as MouseEvent));
    this.canvas.subscribe('mousemove', (event) => this.onMouseMove(event as MouseEvent));
    this.canvas.subscribe('mouseup', () => this.onMouseUp());
  }

  private onMouseDown(event: MouseEvent): void {
    const { top, left } = this.canvas.canvas.getBoundingClientRect();
    const { cellSize } = this.store.getSnapshot();
    this.movePressedMouse({
      x: Math.floor((event.x - left) / cellSize),
      y: Math.floor((event.y - top) / cellSize),
    });
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
    this.isMousePressed = false;
    this.store.dispatch(new SaveHistory());
  }

  private movePressedMouse({ x, y }: Vector): void {
    const { tool, brushSize, grid } = this.store.getSnapshot();
    if (tool === Tools.BRUSH) {
      if (brushSize === 1) {
        this.store.dispatch(new UpdateCell({ x, y }));
      } else {
        // drawCircle(x, y, brushSize - 1);
      }
      return;
    }
    if (tool === Tools.PIPET) {
      this.store.dispatch(new SetColor(grid[x][y]));
    }
  }
}
