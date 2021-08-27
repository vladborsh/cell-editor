import { Injectable } from '@angular/core';

import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class FileExporterService {
  private readonly defaultName = 'test.png';
  private readonly defaultCellSize = 3;

  constructor(private store: StoreService) {}

  public export() {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', this.getUrl());
    anchor.setAttribute('download', this.defaultName);
    anchor.style.display = 'none';
    document.body.append(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  private getUrl(): string {
    const { cellNumberX, cellNumberY, grid } = this.store.getSnapshot();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = cellNumberY * this.defaultCellSize;
    canvas.height = cellNumberX * this.defaultCellSize;

    for (let i = 0; i < cellNumberX; i++) {
      for (let j = 0; j < cellNumberY; j++) {
        if (!grid[i][j]) {
          continue;
        }
        context.fillStyle = `#${grid[i][j]}`;
        context.fillRect(
          i * this.defaultCellSize,
          j * this.defaultCellSize,
          this.defaultCellSize,
          this.defaultCellSize,
        );
      }
    }

    return canvas.toDataURL('image/png');
  }
}
