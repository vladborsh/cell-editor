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
import { ColorPickerComponent } from './app/components/color-picker-component';
import { FileExporter } from './app/io/file-exporter';
import { ResizeBrushComponent } from './app/components/resize-brush-component';
import { StorageService } from './app/services/storage.service';
import { StoragePlugin } from './app/store/plugins/storage.plugin';
import { BresenhamEllipseAlgorithm } from './app/renderering/bresenham-ellipse-algorithm';
import { EllipseTool } from './app/tools/ellipse.tool';

const storageService = new StorageService();
const store = new Store(
  reducers,
  storageService,
  defaultState,
  [
    new LoggerPlugin(ActionTypes.MOVE_MOUSE),
    new StoragePlugin(storageService, ActionTypes.MOVE_MOUSE),
  ],
);
store.dispatch(new SaveHistory());
const canvas = new Canvas(store);
const bresenhamEllipseAlgorithm = new BresenhamEllipseAlgorithm();
const ellipseTool = new EllipseTool(bresenhamEllipseAlgorithm, store);
const cursorListener = new CursorListener(
  store,
  canvas,
  bresenhamEllipseAlgorithm,
  ellipseTool,
);
const keyboardListeners = new KeyboardListeners(
  store,
  () => new ColorPickerComponent(store, canvas),
  () => new ResizeBrushComponent(store, canvas),
  new FileExporter(store),
);
const renderer = new Renderer(store, canvas);

canvas.appendCanvasTo(document.body);
cursorListener.install();
keyboardListeners.install();
renderer.render();
