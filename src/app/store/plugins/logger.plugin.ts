import { ActionTypes } from '../../enums/actions-type.enum';
import { GlobalState } from '../../interfaces/global-state.interface';
import { Actions } from '../actions/actions';
import { PluginInterface } from './pluggin.interface';

export class LoggerPlugin implements PluginInterface {
  constructor(private skipActions?: ActionTypes) {}

  public apply() {
    return this.log.bind(this);
  }

  private log(action: Actions, state: GlobalState): void {
    if (this.skipActions && this.skipActions.includes(action.type)) {
      return;
    }
    console.group()
    console.info('Time:', Date.now())
    console.log(action);
    console.log(state);
    console.groupEnd()
  }
}

