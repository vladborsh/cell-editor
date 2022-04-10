import { ActionTypes } from '../../enums/actions-type.enum';
import { Vector } from '../../interfaces/vector.interface';

export class UpdateCells {
  readonly type = ActionTypes.UPDATE_CELLS;

  constructor(public readonly positions: Vector[], public readonly isEraser = false) {}
}
