import { ActionTypes } from "../../enums/actions-type.enum";

export class UpdateBrushSize {
  readonly type = ActionTypes.UPDATE_BRUSH_SIZE;

  constructor(public readonly brushSize: number) {}
}
