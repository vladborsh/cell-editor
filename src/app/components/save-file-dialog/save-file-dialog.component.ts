import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileExporterService } from 'src/app/services/file-exporter/file-exporter.service';

import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-save-file-dialog',
  templateUrl: './save-file-dialog.component.html',
  styleUrls: ['./save-file-dialog.component.scss'],
})
export class SaveFileDialogComponent {
  public fileName: string;
  public cellSize = 3;

  constructor(
    private storeService: StoreService,
    private fileExporter: FileExporterService,
    @Optional() private dialogRef: MatDialogRef<void>,
  ) {}

  onSubmit(): void {
    const { cellNumberX, cellNumberY, grid } = this.storeService.getSnapshot();

    this.fileExporter.export(this.fileName, this.cellSize, cellNumberX, cellNumberY, grid);
    this.dialogRef.close();
  }
}
