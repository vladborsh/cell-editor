import { Canvas } from "../canvas";
import { UpdateBrushSize } from "../store/actions/update-brush-size.action";
import { Store } from "../store/store";

export class ResizeBrushComponent {
  private template: HTMLTemplateElement;

  constructor(private store: Store, private canvas: Canvas) {
    this.template = document.querySelector('#resize-brush');
  }

  public setup(anchor: HTMLElement): void {
    const { brushSize, cursorPosition } = this.store.getSnapshot();
    const template = this.template.content.cloneNode(true);
    const input = (<HTMLInputElement>template).querySelector('input');
    const container = (<HTMLElement>template).querySelector('.resize-brush-container');
    const rect = this.canvas.canvas.getBoundingClientRect();
    input.value = `${brushSize}`;
    (<HTMLElement>container).style.left = `${rect.x + cursorPosition.x}px`;
    (<HTMLElement>container).style.top = `${rect.y + cursorPosition.y}px`;
    anchor.append(template);

    input.addEventListener('input', () => {
      this.store.dispatch(new UpdateBrushSize(Number(input.value)));
      container.remove();
    });

    document.addEventListener('click', () => {
      container.remove();
    });
  }
}
