import { ActionTypes } from '../../enums/actions-type.enum';
import { Vector } from '../../interfaces/vector.interface';

export class UpdateGridSize {
  readonly type = ActionTypes.UPDATE_GRID_SIZE;

  constructor(public readonly newGridSize: Vector) {}
}
