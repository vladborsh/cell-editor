import { ActionTypes } from "../../enums/actions-type.enum";
import { GlobalState } from "../../interfaces/global-state.interface";
import { StorageService } from "../../services/storage.service";
import { Actions } from "../actions/actions";
import { PluginInterface } from "./pluggin.interface";

export class StoragePlugin implements PluginInterface {
  constructor(private storageService: StorageService, private skipActions?: ActionTypes) {}

  public apply() {
    return this.addToStorage.bind(this);
  }

  private addToStorage(action: Actions, state: GlobalState): void {
    if (this.skipActions && this.skipActions.includes(action.type)) {
      return;
    }

    this.storageService.addToStorage(state);
  }
}
