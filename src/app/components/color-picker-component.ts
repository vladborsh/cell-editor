import { Canvas } from "../canvas";
import { UpdateColor } from "../store/actions/update-color.action";
import { Store } from "../store/store";

export class ColorPickerComponent {
  private template: HTMLTemplateElement;

  constructor(private store: Store, private canvas: Canvas) {
    this.template = document.querySelector('#color-picker');
  }

  public setup(anchor: HTMLElement) {
    const { color, cursorPosition } = this.store.getSnapshot();
    const template = this.template.content.cloneNode(true);
    const input = (<HTMLElement>template).querySelector('input');
    const picker = (<HTMLElement>template).querySelector('.color-picker-container');
    const rect = this.canvas.canvas.getBoundingClientRect();
    (<HTMLElement>picker).style.left = `${rect.x + cursorPosition.x}px`;
    (<HTMLElement>picker).style.top = `${rect.y + cursorPosition.y}px`;
    anchor.append(template);
    input.value = `#${color}`;
    input.focus();
    input.click();

    input.addEventListener('input', () => {
      this.store.dispatch(new UpdateColor(input.value.replaceAll('#', '')));
      picker.remove();
    });

    document.addEventListener('click', () => {
      picker.remove();
    });
  }
}
