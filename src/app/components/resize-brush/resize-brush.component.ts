import { Component, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CursorOverlayService } from 'src/app/services/cursor-overlay/cursor-overlay.service';

import { StoreService } from '../../services/store/store.service';
import { UpdateBrushSize } from '../../store/actions/update-brush-size.action';

@Component({
  selector: 'app-resize-brush',
  templateUrl: './resize-brush.component.html',
  styleUrls: ['./resize-brush.component.scss'],
})
export class ResizeBrushComponent implements OnInit {
  public brushSize: string;

  constructor(
    private store: StoreService,
    private cursorOverlayService: CursorOverlayService,
    @Optional() public dialogRef: MatDialogRef<void>,
  ) {}

  ngOnInit(): void {
    const { brushSize } = this.store.getSnapshot();

    this.brushSize = `${brushSize}`;
  }

  public onChange(event: string): void {
    this.store.dispatch(new UpdateBrushSize(Number(event)));
    this.brushSize = event;
  }

  public onClickOutside(): void {
    if (!this.dialogRef) {
      this.cursorOverlayService.clickOutside();
    }
  }

  public onSubmit(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
