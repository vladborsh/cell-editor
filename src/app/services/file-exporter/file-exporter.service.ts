import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileExporterService {
  public export(
    fileName: string,
    cellSize: number,
    cellNumberX: number,
    cellNumberY: number,
    grid: string[][],
  ) {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', this.getUrl(cellNumberX, cellNumberY, grid, cellSize));
    anchor.setAttribute('download', fileName);
    anchor.style.display = 'none';
    document.body.append(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  private getUrl(
    cellNumberX: number,
    cellNumberY: number,
    grid: string[][],
    cellSize: number,
  ): string {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = cellNumberY * cellSize;
    canvas.height = cellNumberX * cellSize;

    for (let i = 0; i < cellNumberX; i++) {
      for (let j = 0; j < cellNumberY; j++) {
        if (!grid[i][j]) {
          continue;
        }
        context.fillStyle = `#${grid[i][j]}`;
        context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }

    return canvas.toDataURL('image/png');
  }
}
