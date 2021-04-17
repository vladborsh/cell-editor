import { ActionTypes } from '../../enums/actions-type.enum';
import { Vector } from '../../interfaces/vector.interface';

export class UpdateToolLayerCells {
  readonly type = ActionTypes.UPDATE_TOOL_LAYER_CELLS;

  constructor(public readonly positions: Vector[]) {}
}
