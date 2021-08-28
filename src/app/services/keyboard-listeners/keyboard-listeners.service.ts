import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ColorPickerComponent } from '../../components/color-picker/color-picker.component';
import { ResizeBrushComponent } from '../../components/resize-brush/resize-brush.component';
import { ResizeGridComponent } from '../../components/resize-grid/resize-grid.component';
import { SaveFileDialogComponent } from '../../components/save-file-dialog/save-file-dialog.component';
import { Tools } from '../../enums/tools.enum';
import { Clear } from '../../store/actions/clear.action';
import { Redo } from '../../store/actions/redo.action';
import { SetTool } from '../../store/actions/set-tool.action';
import { Undo } from '../../store/actions/undo.action';
import { CursorOverlayService } from '../cursor-overlay/cursor-overlay.service';
import { FileExporterService } from '../file-exporter/file-exporter.service';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class KeyboardListenersService {
  constructor(
    private store: StoreService,
    private cursorOverlayService: CursorOverlayService,
    private matDialog: MatDialog,
  ) {}

  public install(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.shiftKey && event.metaKey && event.code === 'KeyR') {
        this.store.dispatch(new Clear());
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
        this.matDialog.open(SaveFileDialogComponent);
        return;
      }
      if (event.code === 'KeyP') {
        this.store.dispatch(new SetTool(Tools.PIPET));
        return;
      }
      if (event.code === 'KeyB') {
        this.store.dispatch(new SetTool(Tools.BRUSH));
        return;
      }
      if (event.code === 'KeyE') {
        this.store.dispatch(new SetTool(Tools.ELLIPSE));
        return;
      }
      if (event.code === 'KeyR') {
        this.store.dispatch(new SetTool(Tools.RECTANGLE));
        return;
      }
      if (event.code === 'KeyF') {
        this.store.dispatch(new SetTool(Tools.FILL));
        return;
      }
      if (event.code === 'KeyL') {
        this.store.dispatch(new SetTool(Tools.LINE));
        return;
      }
      if (event.code === 'KeyC') {
        this.cursorOverlayService.open(ColorPickerComponent);
        return;
      }
      if (event.code === 'KeyS') {
        this.matDialog.open(ResizeBrushComponent);
        return;
      }
      if (event.code === 'KeyG') {
        this.matDialog.open(ResizeGridComponent);
        return;
      }
    });
  }
}