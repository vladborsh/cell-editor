import { Component, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { StoreService } from '../../services/store/store.service';
import { UpdateGridSize } from '../../store/actions/update-grid-size.action';

@Component({
  selector: 'app-resize-grid',
  templateUrl: './resize-grid.component.html',
  styleUrls: ['./resize-grid.component.scss'],
})
export class ResizeGridComponent implements OnInit {
  public gridSizeX: number;
  public gridSizeY: number;

  constructor(private store: StoreService, @Optional() public dialogRef: MatDialogRef<void>) {}

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

    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
