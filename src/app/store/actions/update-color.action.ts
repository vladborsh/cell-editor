import { ActionTypes } from '../../enums/actions-type.enum';

export class UpdateColor {
  readonly type = ActionTypes.UPDATE_COLOR;

  constructor(public readonly color: string) {}
}
