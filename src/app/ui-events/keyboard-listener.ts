import { Redo } from "../store/actions/redo.action";
import { SetTool } from "../store/actions/set-tool.action";
import { Undo } from "../store/actions/undo.action";
import { Tools } from "../enums/tools.enum";
import { Store } from "../store/store";
import { Clear } from "../store/actions/clear.action";
import { ColorPickerComponent } from "../components/color-picker-component";
import { FileExporter } from "../io/file-exporter";
import { ResizeBrushComponent } from "../components/resize-brush-component";

export class KeyboardListeners {
  constructor(
    private store: Store,
    private colorPikerComponentFct: () => ColorPickerComponent,
    private resizeBrushComponentFct: () => ResizeBrushComponent,
    private fileExporter: FileExporter,
  ) {}

  public install(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.shiftKey && event.metaKey && event.code === 'KeyR') {
        this.store.dispatch(new Clear())
        return;
      }
      if (event.metaKey && event.code === 'KeyY') {
        event.preventDefault();
        this.store.dispatch(new Redo());
        return;
      }
      if (event.metaKey && event.code === 'KeyZ') {
        this.store.dispatch(new Undo());
        return;
      }
      if (event.metaKey && event.code === 'KeyS') {
        event.preventDefault();
        this.fileExporter.export();
        return;
      }
      if (event.code === 'KeyP') {
        this.store.dispatch(new SetTool(Tools.PIPET))
        return;
      }
      if (event.code === 'KeyB') {
        this.store.dispatch(new SetTool(Tools.BRUSH))
        return;
      }
      if (event.code === 'KeyE') {
        this.store.dispatch(new SetTool(Tools.ELLIPSE))
        return;
      }
      if (event.code === 'KeyF') {
        this.store.dispatch(new SetTool(Tools.FILL))
        return;
      }
      if (event.code === 'KeyC') {
        this.colorPikerComponentFct().setup(document.body);
        return;
      }
      if (event.code === 'KeyS') {
        this.resizeBrushComponentFct().setup(document.body);
        return;
      }
    })
  }
}
