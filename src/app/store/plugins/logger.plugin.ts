import { Injectable } from '@angular/core';

import { ActionTypes } from '../../enums/actions-type.enum';
import { CanvasBoardState } from '../../interfaces/global-state.interface';
import { Actions } from '../actions/actions';
import { PluginInterface } from './pluggin.interface';

@Injectable()
export class LoggerPlugin implements PluginInterface {
  private skipActions = ActionTypes.MOVE_MOUSE;

  public apply() {
    return this.log.bind(this);
  }

  private log(action: Actions, state: CanvasBoardState): void {
    if (this.skipActions && this.skipActions.includes(action.type)) {
      return;
    }
    /* eslint-disable */
    console.group();
    console.info('Time:', Date.now());
    console.log(action);
    console.log(state);
    console.groupEnd();
    /* eslint-enable */
  }
}
