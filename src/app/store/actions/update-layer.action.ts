import { Layer } from 'src/app/interfaces/layer.interface';

import { ActionTypes } from '../../enums/actions-type.enum';

export class UpdateLayer {
  readonly type = ActionTypes.UPDATE_LAYER;

  constructor(public readonly layer: Partial<Layer>) {}
}
