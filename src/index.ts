import './style.scss';

import { Canvas } from './app/canvas';
import { Renderer } from './app/renderer';
import { defaultState } from './app/store/default-state';
import { reducers } from './app/store/reducers';
import { Store } from './app/store/store';
import { CursorListener } from './app/ui-events/cursor-listener';

const store = new Store(reducers, defaultState);
const canvas = new Canvas(store);
const cursorListener = new CursorListener(store, canvas);
const renderer = new Renderer(store, canvas);

canvas.appendCanvasTo(document.body);
cursorListener.install();
renderer.render();
