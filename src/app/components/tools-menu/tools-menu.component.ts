import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tools } from 'src/app/enums/tools.enum';
import { CursorOverlayService } from 'src/app/services/cursor-overlay/cursor-overlay.service';
import { StoreService } from 'src/app/services/store/store.service';
import { SetTool } from 'src/app/store/actions/set-tool.action';
import { UpdateBrushSize } from 'src/app/store/actions/update-brush-size.action';

import { ResizeGridComponent } from '../resize-grid/resize-grid.component';

@Component({
  selector: 'app-tools-menu',
  templateUrl: './tools-menu.component.html',
  styleUrls: ['./tools-menu.component.scss'],
})
export class ToolsMenuComponent {
  public activeTool$ = this.storeService.select('tool');
  public color$ = this.storeService.select('color');
  public brushSize$ = this.storeService.select('brushSize');
  public toolsType = Tools;

  constructor(
    private storeService: StoreService,
    public matDialog: MatDialog,
    public cursorOverlayService: CursorOverlayService,
  ) {}

  public onSelectBrush(): void {
    this.storeService.dispatch(new SetTool(Tools.BRUSH));
  }

  public onResizeBrush(event: string): void {
    this.storeService.dispatch(new UpdateBrushSize(Number(event)));
  }

  public onSelectEraser(): void {
    this.storeService.dispatch(new SetTool(Tools.ERASER));
  }

  public onSelectFill(): void {
    this.storeService.dispatch(new SetTool(Tools.FILL));
  }

  public onSelectRectangle(): void {
    this.storeService.dispatch(new SetTool(Tools.RECTANGLE));
  }

  public onSelectEllipse(): void {
    this.storeService.dispatch(new SetTool(Tools.ELLIPSE));
  }

  public onSelectLine(): void {
    this.storeService.dispatch(new SetTool(Tools.LINE));
  }

  public onSelectPipet(): void {
    this.storeService.dispatch(new SetTool(Tools.PIPET));
  }

  public onResizeCanvas(): void {
    this.matDialog.open(ResizeGridComponent);
  }
}
