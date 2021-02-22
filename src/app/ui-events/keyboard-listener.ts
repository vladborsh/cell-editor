import { Redo } from "../actions/redo.action";
import { SetTool } from "../actions/set-tool.action";
import { Undo } from "../actions/undo.action";
import { Tools } from "../enums/tools.enum";
import { Store } from "../store/store";

export class KeyboardListeners {
  constructor(private store: Store) {}

  public install(): void {
    document.addEventListener('keypress', (event: KeyboardEvent) => {
      console.log(event.key.toLowerCase())
      if (['p', 'з'].includes(event.key.toLowerCase())) {
        this.store.dispatch(new SetTool(Tools.PIPET))
      }
      if (['b', 'и'].includes(event.key.toLowerCase())) {
        this.store.dispatch(new SetTool(Tools.BRUSH))
      }
      if (event.metaKey && ['z', 'я'].includes(event.key.toLowerCase())) {
        this.store.dispatch(new Undo());
      }
      if (event.metaKey && event.shiftKey && ['z', 'я'].includes(event.key.toLowerCase())) {
        this.store.dispatch(new Redo());
      }
    })
  }
}
