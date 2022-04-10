import { ActionTypes } from '../../enums/actions-type.enum';

export class CopyLayer {
  readonly type = ActionTypes.COPY_LAYER;
  constructor(public name: string) {}
}
