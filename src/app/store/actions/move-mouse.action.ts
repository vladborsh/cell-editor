import { ActionTypes } from '../../enums/actions-type.enum';
import { Vector } from '../../interfaces/vector.interface';

export class MoveMouse {
  readonly type = ActionTypes.MOVE_MOUSE;

  constructor(public readonly position: Vector) {}
}
