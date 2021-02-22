import { Redo } from "../store/actions/redo.action";
import { SetTool } from "../store/actions/set-tool.action";
import { Undo } from "../store/actions/undo.action";
import { Tools } from "../enums/tools.enum";
import { Store } from "../store/store";
import { Clear } from "../store/actions/clear.action";
import { ColorPickerComponent } from "../components/color-picker-component";

export class KeyboardListeners {
  constructor(private store: Store, private paletteComponentFct: () => ColorPickerComponent) {}

  public install(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.code === 'KeyP') {
        this.store.dispatch(new SetTool(Tools.PIPET))
        return;
      }
      if (event.code === 'KeyB') {
        this.store.dispatch(new SetTool(Tools.BRUSH))
        return;
      }
      if (event.code === 'KeyR') {
        this.store.dispatch(new Clear())
        return;
      }
      if (event.code === 'KeyC') {
        this.paletteComponentFct().setup(document.body);
        return;
      }
      if (event.metaKey && event.code === 'KeyY') {
        this.store.dispatch(new Redo());
        return;
      }
      if (event.metaKey && event.code === 'KeyZ') {
        this.store.dispatch(new Undo());
        return;
      }
    })
  }
}
