import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CursorOverlayService } from 'src/app/services/cursor-overlay/cursor-overlay.service';

import { StoreService } from '../../services/store/store.service';
import { UpdateBrushSize } from '../../store/actions/update-brush-size.action';

@Component({
  selector: 'app-resize-brush',
  templateUrl: './resize-brush.component.html',
  styleUrls: ['./resize-brush.component.scss'],
})
export class ResizeBrushComponent implements OnInit {
  @Output() clickOutside = new EventEmitter<void>();

  public brushSize = 2;

  constructor(private store: StoreService, private cursorOverlayService: CursorOverlayService) {}

  ngOnInit(): void {
    const { brushSize, cursorPosition } = this.store.getSnapshot();

    this.brushSize = brushSize;
  }

  public onChange(event: string): void {
    this.store.dispatch(new UpdateBrushSize(Number(event)));
  }

  public onClickOutside(): void {
    this.clickOutside.emit();
    this.cursorOverlayService.clickOutside();
  }
}
