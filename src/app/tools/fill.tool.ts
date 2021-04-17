import { Vector } from "../interfaces/vector.interface";
import { UpdateCells } from "../store/actions/update-cells.action";
import { Store } from "../store/store";
import { isInVectorList } from "../utils/is-in-vector-list.helper";

export class FillTool {
  constructor(private store: Store) {}

  onSetup(position: Vector): void {
    const { grid } = this.store.getSnapshot();

    this.store.dispatch(
      new UpdateCells(
        getRenderingCells(position, grid, []),
      )
    );
  }
}

function getRenderingCells({ x, y }: Vector, grid: string[][], stack: Vector[]): Vector[] {
  stack.push({ x, y });

  if (x > 0 && grid[x][y] === grid[x - 1][y] && !isInVectorList({x: x - 1, y}, stack)) {
    getRenderingCells({x: x - 1, y}, grid, stack);
  }

  if (y > 0 && grid[x][y] === grid[x][y - 1] && !isInVectorList({x, y: y - 1}, stack)) {
    getRenderingCells({x, y: y - 1}, grid, stack);
  }

  if (x < grid.length - 1 && grid[x][y] === grid[x + 1][y] && !isInVectorList({x: x + 1, y}, stack)) {
    getRenderingCells({x: x + 1, y}, grid, stack);
  }

  if (y < grid[0].length - 1 && grid[x][y] === grid[x][y + 1] && !isInVectorList({x, y: y + 1}, stack)) {
    getRenderingCells({x, y: y + 1}, grid, stack);
  }
  return stack
}


