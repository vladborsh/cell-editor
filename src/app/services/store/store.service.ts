import { Inject, Injectable } from '@angular/core';
import { REDUCERS } from 'src/app/tokens/reducers.token';
import { STORE_PLUGINS } from 'src/app/tokens/store-plugins.token';

import { ActionTypes } from '../../enums/actions-type.enum';
import { CanvasBoardState } from '../../interfaces/global-state.interface';
import { Actions } from '../../store/actions/actions';
import { defaultState } from '../../store/default-state';
import { PluginInterface } from '../../store/plugins/pluggin.interface';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private state: CanvasBoardState;
  private listeners: Record<string, ((val: CanvasBoardState[keyof CanvasBoardState]) => void)[]> =
    {};
  private pluginFns: ((action: Actions, state: CanvasBoardState) => void)[];

  constructor(
    @Inject(REDUCERS)
    private reducers: Record<
      ActionTypes,
      (action: Actions, state: CanvasBoardState) => CanvasBoardState
    >,
    @Inject(STORE_PLUGINS) private plugins: PluginInterface[],
    storageService: StorageService,
  ) {
    this.state = storageService.isEmpty() ? defaultState : storageService.pullFromStorage();
    this.pluginFns = this.plugins.map(plugin => plugin.apply());
  }

  public getSnapshot(): CanvasBoardState {
    return this.state;
  }

  public dispatch(action: Actions): void {
    const oldState = this.state;
    this.state = this.reducers[action.type](action, this.state);
    this.pluginFns.forEach(pluginFn => pluginFn(action, this.state));
    this.getDiffKeys(oldState, this.state).forEach((key: keyof CanvasBoardState) => {
      if (this.listeners[key]) {
        this.listeners[key].forEach(listener => listener(this.state[key]));
      }
    });
  }

  public subscribeToProp<T extends keyof CanvasBoardState>(
    propName: T,
    listener: (val: CanvasBoardState[T]) => void,
  ): void {
    if (!this.listeners[propName]) {
      this.listeners[propName] = [];
    }

    this.listeners[propName].push(listener);
  }

  private getDiffKeys(oldState: CanvasBoardState, newState: CanvasBoardState): string[] {
    const result = [];

    for (const key in newState) {
      if (oldState[key] !== newState[key]) {
        result.push(key);
      }
    }

    return result;
  }
}
