import { ActionTypes } from '../../enums/actions-type.enum';
import { Vector } from '../../interfaces/vector.interface';

export class UpdateCell {
  readonly type = ActionTypes.UPDATE_CELL;

  constructor(public readonly position: Vector) {}
}
