import { ActionTypes } from "../../enums/actions-type.enum";

export class UpdateZoom {
  readonly type = ActionTypes.UPDATE_ZOOM;

  constructor(public readonly zoom: number) {}
}
