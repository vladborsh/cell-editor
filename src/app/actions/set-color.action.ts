import { ActionTypes } from '../enums/actions-type.enum';
import { Vector } from '../interfaces/vector.interface';

export class SetColor {
  readonly type = ActionTypes.SET_COLOR;

  constructor(public readonly color: string) {}
}
