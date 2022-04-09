import { Injectable } from '@angular/core';
import { Layer } from 'src/app/interfaces/layer.interface';

@Injectable({
  providedIn: 'root',
})
export class FileExporterService {
  public export(
    fileName: string,
    cellSize: number,
    cellNumberX: number,
    cellNumberY: number,
    grid: string[][][],
    layers: Layer[],
    isSpriteMap = false,
    isFlipped = false,
  ) {
    const anchor = document.createElement('a');
    let url: string;
    if (isSpriteMap) {
      url = this.getUrlSpriteMap(cellSize, cellNumberX, cellNumberY, grid, isFlipped);
    } else {
      url = this.getUrlSingle(cellSize, cellNumberX, cellNumberY, grid, layers);
    }
    anchor.setAttribute('href', url);
    anchor.setAttribute('download', fileName);
    anchor.style.display = 'none';
    document.body.append(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  private getUrlSingle(
    cellSize: number,
    cellNumberX: number,
    cellNumberY: number,
    grid: string[][][],
    layers: Layer[],
  ): string {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = cellNumberY * cellSize;
    canvas.height = cellNumberX * cellSize;

    for (let layer = 0; layer < grid.length; layer++) {
      for (let i = 0; i < cellNumberX; i++) {
        for (let j = 0; j < cellNumberY; j++) {
          if (!grid[layer][i][j]) {
            continue;
          }
          context.globalAlpha = layers[layer].opacity / 100;
          context.fillStyle = `#${grid[layer][i][j]}`;
          context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }

    return canvas.toDataURL('image/png');
  }

  private getUrlSpriteMap(
    cellSize: number,
    cellNumberX: number,
    cellNumberY: number,
    grid: string[][][],
    isFlipped = false,
  ): string {
    console.log(isFlipped);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const width = cellNumberY * cellSize;
    canvas.width = cellNumberY * cellSize * grid.length;
    canvas.height = cellNumberX * cellSize;

    for (let layer = 0; layer < grid.length; layer++) {
      for (let i = 0; i < cellNumberX; i++) {
        for (let j = 0; j < cellNumberY; j++) {
          if (isFlipped) {
            if (!grid[layer][cellNumberX - 1 - i][j]) {
              continue;
            }
            context.fillStyle = `#${grid[layer][cellNumberX - 1 - i][j]}`;
          } else {
            if (!grid[layer][i][j]) {
              continue;
            }
            context.fillStyle = `#${grid[layer][i][j]}`;
          }
          context.fillRect(layer * width + i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }

    return canvas.toDataURL('image/png');
  }
}
