import { Canvas } from './canvas';
import { Store } from './store/store';

export class Renderer {
  constructor(private store: Store, private canvas: Canvas) {}

  public render(): void {
    this.clearCanvas();
    this.drawGrid();
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
    } = this.store.getSnapshot();
    this.canvas.context.beginPath();
    this.canvas.context.arc(x, y, brushSize * cellSize, 0, 2 * Math.PI);
    this.canvas.context.stroke();
  }

  private drawGrid(): void {
    if (!this.canvas.context) {
      return;
    }

    const { grid, cellSize, cellNumberX, cellNumberY } = this.store.getSnapshot();
    for (let i = 0; i < cellNumberX; i++) {
      for (let j = 0; j < cellNumberY; j++) {
        this.canvas.context.fillStyle = `#${grid[i][j]}`;
        this.canvas.context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }
    this.canvas.context.lineWidth = 1;
  }
}
