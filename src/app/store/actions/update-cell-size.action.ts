import { ActionTypes } from "../../enums/actions-type.enum";

export class UpdateCellSize {
  readonly type = ActionTypes.UPDATE_CELL_SIZE;

  constructor(public readonly cellSize: number) {}
}
