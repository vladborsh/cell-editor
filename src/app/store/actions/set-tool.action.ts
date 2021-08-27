import { ActionTypes } from '../../enums/actions-type.enum';
import { Tools } from '../../enums/tools.enum';

export class SetTool {
  readonly type = ActionTypes.SET_TOOL;

  constructor(public readonly tool: Tools) {}
}
