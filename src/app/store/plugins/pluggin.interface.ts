import { GlobalState } from '../../interfaces/global-state.interface';
import { Actions } from '../actions/actions';

export interface PluginInterface {
  apply(): (action: Actions, state: GlobalState) => void;
}
