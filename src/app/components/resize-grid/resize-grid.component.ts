import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CursorOverlayService } from 'src/app/services/cursor-overlay/cursor-overlay.service';

import { StoreService } from '../../services/store/store.service';
import { UpdateGridSize } from '../../store/actions/update-grid-size.action';

@Component({
  selector: 'app-resize-grid',
  templateUrl: './resize-grid.component.html',
  styleUrls: ['./resize-grid.component.scss'],
})
export class ResizeGridComponent implements OnInit {
  @Output() submit = new EventEmitter<void>();

  public gridSizeX: number;
  public gridSizeY: number;

  constructor(private store: StoreService, private cursorOverlayService: CursorOverlayService) {}

  ngOnInit(): void {
    const { cellNumberX, cellNumberY } = this.store.getSnapshot();

    this.gridSizeX = cellNumberX;
    this.gridSizeY = cellNumberY;
  }

  public onSubmit(): void {
    this.store.dispatch(
      new UpdateGridSize({
        x: Number(this.gridSizeX),
        y: Number(this.gridSizeY),
      }),
    );
    this.submit.emit();
    this.cursorOverlayService.clickOutside();
  }
}
