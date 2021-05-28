import { Canvas } from '../canvas';
import { UpdateGridSize } from '../store/actions/update-grid-size.action';
import { Store } from '../store/store';

export class ResizeGridComponent {
  private template: HTMLTemplateElement;

  constructor(private store: Store, private canvas: Canvas) {
    this.template = document.querySelector('#resize-grid');
  }

  public setup(anchor: HTMLElement): void {
    const { cursorPosition, cellNumberX, cellNumberY } = this.store.getSnapshot();
    const template = this.template.content.cloneNode(true);
    const inputFridSizeX: HTMLInputElement = (template as HTMLElement).querySelector(
      'input[name=grid-size-x]',
    );
    const inputFridSizeY: HTMLInputElement = (template as HTMLElement).querySelector(
      'input[name=grid-size-y]',
    );
    const sumbit: HTMLButtonElement = (template as HTMLElement).querySelector('button#submit');
    const container = (template as HTMLElement).querySelector('.resize-grid-container');
    const rect = this.canvas.canvas.getBoundingClientRect();
    inputFridSizeX.value = `${cellNumberX}`;
    inputFridSizeY.value = `${cellNumberY}`;
    (container as HTMLElement).style.left = `${rect.x + cursorPosition.x}px`;
    (container as HTMLElement).style.top = `${rect.y + cursorPosition.y}px`;
    anchor.append(template);

    sumbit.addEventListener('click', () => {
      console.log('click');
      this.store.dispatch(
        new UpdateGridSize({
          x: Number(inputFridSizeX.value),
          y: Number(inputFridSizeY.value),
        }),
      );
      container.remove();
    });
  }
}
