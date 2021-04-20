import { Store } from '../store/store';

export class FileExporter {
  private DEFAULT_NAME = 'test.png';
  private DEFAULT_CELL_SIZE = 3;

  constructor(private store: Store) {}

  public export() {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', this.getUrl());
    anchor.setAttribute('download', this.DEFAULT_NAME);
    anchor.style.display = 'none';
    document.body.append(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  private getUrl(): string {
    const { cellNumberX, cellNumberY, grid } = this.store.getSnapshot();
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = cellNumberY * this.DEFAULT_CELL_SIZE;
    canvas.height = cellNumberX * this.DEFAULT_CELL_SIZE;

    for (let i = 0; i < cellNumberX; i++) {
      for (let j = 0; j < cellNumberY; j++) {
        if (!grid[i][j]) {
          continue;
        }
        context.fillStyle = `#${grid[i][j]}`;
        context.fillRect(
          i * this.DEFAULT_CELL_SIZE,
          j * this.DEFAULT_CELL_SIZE,
          this.DEFAULT_CELL_SIZE,
          this.DEFAULT_CELL_SIZE,
        );
      }
    }

    return canvas.toDataURL('image/png');
  }
}
