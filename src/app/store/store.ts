import { Actions } from './actions/actions';
import { ActionTypes } from '../enums/actions-type.enum';
import { GlobalState } from '../interfaces/global-state.interface';
import { PluginInterface } from './plugins/pluggin.interface';
import { StorageService } from '../services/storage.service';

export class Store {
  private state: GlobalState;
  private listeners: Record<string, ((val: GlobalState[keyof GlobalState]) => void)[]> = {};
  private pluginFns: ((action: Actions, state: GlobalState) => void)[];

  constructor(
    private reducers: Record<ActionTypes, (action: Actions, state: GlobalState) => GlobalState>,
    storageService: StorageService,
    defaultState: GlobalState,
    private plugins: PluginInterface[],
  ) {
    console.log(storageService.isEmpty(), storageService.pullFromStorage())
    this.state = storageService.isEmpty() ? defaultState : storageService.pullFromStorage();
    this.pluginFns = this.plugins.map(plugin => plugin.apply());
  }

  public getSnapshot(): GlobalState {
    return this.state;
  }

  public dispatch(action: Actions): void {
    this.state = this.reducers[action.type](action, this.state);
    this.pluginFns.forEach(pluginFn => pluginFn(action, this.state));
  }

  public subscribeToProp<T extends keyof GlobalState>(propName: T, listener: (val: GlobalState[T]) => void): void {
    if (!this.listeners[propName]) {
      this.listeners[propName] = [];
    }

    this.listeners[propName].push(listener);
  }
}
