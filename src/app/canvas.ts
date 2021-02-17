import { Store } from './store/store';

export class Canvas {
  public context: CanvasRenderingContext2D | null;
  public canvas: HTMLCanvasElement;
  public readonly className = 'canvas-box';

  constructor(store: Store) {
    const { canvasHeight, canvasWidth } = store.getSnapshot();
    this.canvas = document.createElement('canvas');
    this.canvas.width = canvasHeight;
    this.canvas.height = canvasWidth;
    this.canvas.style.cursor = 'none';
    this.context = this.canvas.getContext('2d');

    store.subscribeToProp('canvasHeight', (value: number) => (this.canvas.height = value));
    store.subscribeToProp('canvasWidth', (value: number) => (this.canvas.width = value));
  }

  appendCanvasTo(element: Element): void {
    const box = document.createElement('div');
    box.append(this.canvas);
    box.className = this.className;
    element.append(box);
  }

  subscribe(event: string, handler: (event: Event) => void): void {
    this.canvas.addEventListener(event, handler);
  }
}
