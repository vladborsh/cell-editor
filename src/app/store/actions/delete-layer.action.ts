import { ActionTypes } from '../../enums/actions-type.enum';

export class DeleteLayer {
  readonly type = ActionTypes.DELETE_LAYER;
  constructor(public name: string) {}
}
