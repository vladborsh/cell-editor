import { ActionTypes } from '../../enums/actions-type.enum';

export class SetActiveLayer {
  readonly type = ActionTypes.SET_ACTIVE_LAYER;
  constructor(public num: number) {}
}
