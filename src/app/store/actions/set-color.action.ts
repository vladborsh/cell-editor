import { ActionTypes } from '../../enums/actions-type.enum';

export class SetColor {
  readonly type = ActionTypes.SET_COLOR;

  constructor(public readonly color: string) {}
}
