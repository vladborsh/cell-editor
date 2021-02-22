import './style.scss';

import { Canvas } from './app/canvas';
import { Renderer } from './app/renderer';
import { defaultState } from './app/store/default-state';
import { reducers } from './app/store/reducers';
import { Store } from './app/store/store';
import { CursorListener } from './app/ui-events/cursor-listener';
import { KeyboardListeners } from './app/ui-events/keyboard-listener';
import { LoggerPlugin } from './app/store/plugins/logger.plugin';
import { ActionTypes } from './app/enums/actions-type.enum';
import { SaveHistory } from './app/store/actions/save-history.action';

const store = new Store(
  reducers,
  defaultState,
  [
    new LoggerPlugin(ActionTypes.MOVE_MOUSE)
  ]
);
store.dispatch(new SaveHistory());
const canvas = new Canvas(store);
const cursorListener = new CursorListener(store, canvas);
const keyboardListeners = new KeyboardListeners(store);
const renderer = new Renderer(store, canvas);

canvas.appendCanvasTo(document.body);
cursorListener.install();
keyboardListeners.install();
renderer.render();
