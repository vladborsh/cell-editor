import './style.scss';

import { Canvas } from './app/canvas';
import { ColorPickerComponent } from './app/components/color-picker-component';
import { ResizeBrushComponent } from './app/components/resize-brush-component';
import { ResizeGridComponent } from './app/components/resize-grid-component';
import { ActionTypes } from './app/enums/actions-type.enum';
import { FileExporter } from './app/io/file-exporter';
import { Renderer } from './app/renderer';
import { BresenhamEllipseAlgorithm } from './app/renderering/bresenham-ellipse-algorithm';
import { BresenhamLineAlgorithm } from './app/renderering/bresenham-line-algorithm';
import { StorageService } from './app/services/storage.service';
import { SaveHistory } from './app/store/actions/save-history.action';
import { defaultState } from './app/store/default-state';
import { LoggerPlugin } from './app/store/plugins/logger.plugin';
import { StoragePlugin } from './app/store/plugins/storage.plugin';
import { reducers } from './app/store/reducers';
import { Store } from './app/store/store';
import { EllipseTool } from './app/tools/ellipse.tool';
import { FillTool } from './app/tools/fill.tool';
import { LineTool } from './app/tools/line.tool';
import { RectangleTool } from './app/tools/rectangle.tool';
import { CursorListener } from './app/ui-events/cursor-listener';
import { KeyboardListeners } from './app/ui-events/keyboard-listener';

const storageService = new StorageService();
const store = new Store(reducers, storageService, defaultState, [
  new LoggerPlugin(ActionTypes.MOVE_MOUSE),
  new StoragePlugin(storageService, ActionTypes.MOVE_MOUSE),
]);
store.dispatch(new SaveHistory());
const canvas = new Canvas(store);
const bresenhamEllipseAlgorithm = new BresenhamEllipseAlgorithm();
const bresenhamLineAlgorithm = new BresenhamLineAlgorithm();
const ellipseTool = new EllipseTool(bresenhamEllipseAlgorithm, store);
const fillTool = new FillTool(store);
const rectangleTool = new RectangleTool(store);
const lineTool = new LineTool(store, bresenhamLineAlgorithm);
const cursorListener = new CursorListener(
  store,
  canvas,
  bresenhamEllipseAlgorithm,
  ellipseTool,
  fillTool,
  lineTool,
  rectangleTool,
);
const keyboardListeners = new KeyboardListeners(
  store,
  () => new ColorPickerComponent(store, canvas),
  () => new ResizeBrushComponent(store, canvas),
  () => new ResizeGridComponent(store, canvas),
  new FileExporter(store),
);
const renderer = new Renderer(store, canvas);

canvas.appendCanvasTo(document.body);
cursorListener.install();
keyboardListeners.install();
renderer.render();
