import { Injectable } from '@angular/core';

import { ActionTypes } from '../../enums/actions-type.enum';
import { CanvasBoardState } from '../../interfaces/global-state.interface';
import { StorageService } from '../../services/storage/storage.service';
import { Actions } from '../actions/actions';
import { PluginInterface } from './pluggin.interface';

@Injectable()
export class StoragePlugin implements PluginInterface {
  private skipActions = ActionTypes.MOVE_MOUSE;

  constructor(private storageService: StorageService) {}

  public apply() {
    return this.addToStorage.bind(this);
  }

  private addToStorage(action: Actions, state: CanvasBoardState): void {
    if (this.skipActions && this.skipActions.includes(action.type)) {
      return;
    }

    this.storageService.addToStorage(state);
  }
}
