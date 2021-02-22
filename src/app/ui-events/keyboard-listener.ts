import { Redo } from "../store/actions/redo.action";
import { SetTool } from "../store/actions/set-tool.action";
import { Undo } from "../store/actions/undo.action";
import { Tools } from "../enums/tools.enum";
import { Store } from "../store/store";
import { Clear } from "../store/actions/clear.action";

export class KeyboardListeners {
  constructor(private store: Store) {}

  public install(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (['p', 'з'].includes(event.key.toLowerCase())) {
        this.store.dispatch(new SetTool(Tools.PIPET))
        return;
      }
      if (['b', 'и'].includes(event.key.toLowerCase())) {
        this.store.dispatch(new SetTool(Tools.BRUSH))
        return;
      }
      if (['c', 'с'].includes(event.key.toLowerCase())) {
        this.store.dispatch(new Clear())
        return;
      }
      if (event.metaKey && event.shiftKey && ['z', 'я'].includes(event.key.toLowerCase())) {
        this.store.dispatch(new Redo());
        return;
      }
      if (event.metaKey && ['z', 'я'].includes(event.key.toLowerCase())) {
        this.store.dispatch(new Undo());
        return;
      }
    })
  }
}
