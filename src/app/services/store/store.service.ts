import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { REDUCERS } from 'src/app/tokens/reducers.token';
import { STORE_PLUGINS } from 'src/app/tokens/store-plugins.token';

import { ActionTypes } from '../../enums/actions-type.enum';
import { CanvasBoardState } from '../../interfaces/global-state.interface';
import { Actions } from '../../store/actions/actions';
import { getDefaultState } from '../../store/default-state';
import { PluginInterface } from '../../store/plugins/pluggin.interface';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public readonly isReady$ = new BehaviorSubject<boolean>(false);

  private state: CanvasBoardState;
  private listeners: Record<string, ((val: CanvasBoardState[keyof CanvasBoardState]) => void)[]> =
    {};
  private generalListeners: ((val: CanvasBoardState) => void)[] = [];
  private pluginFns: ((action: Actions, state: CanvasBoardState) => void)[];

  constructor(
    @Inject(REDUCERS)
    private reducers: Record<
      ActionTypes,
      (action: Actions, state: CanvasBoardState) => CanvasBoardState
    >,
    @Inject(STORE_PLUGINS) private plugins: PluginInterface[],
    private storageService: StorageService,
  ) {}

  public install(state: CanvasBoardState): void {
    this.state = state;
    this.pluginFns = this.plugins.map(plugin => plugin.apply());
    this.isReady$.next(true);
  }

  public unready(): void {
    this.isReady$.next(false);
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
    this.generalListeners.forEach(listener => listener(this.state));
  }

  public subscribe(listener: (val: CanvasBoardState) => void): void {
    this.generalListeners.push(listener);
  }

  public select<T extends keyof CanvasBoardState>(propName: T): Observable<CanvasBoardState[T]> {
    return new Observable((observer: Observer<CanvasBoardState[T]>) => {
      if (!this.listeners[propName]) {
        this.listeners[propName] = [];
      }

      this.listeners[propName].push((value: CanvasBoardState[T]) => observer.next(value));

      this.isReady$.pipe(filter(Boolean), take(1)).subscribe(() => {
        if (this.state[propName] !== undefined) {
          observer.next(this.state[propName]);
        }
      });
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
