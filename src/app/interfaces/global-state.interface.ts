import { Tools } from '../enums/tools.enum';
import { HistoryFragment } from './history-fragment.interface';
import { Layer } from './layer.interface';
import { Vector } from './vector.interface';

export interface CanvasBoardState {
  canvasHeight: number;
  canvasWidth: number;
  color: string;
  defaultColor: string;
  cursorPosition: Vector;
  brushSize: number;
  cellSize: number;
  cellNumberX: number;
  cellNumberY: number;
  activeLayer: number;
  grid: string[][][];
  layers: Layer[];
  history: HistoryFragment[];
  historyHead: number;
  tool: Tools;
  toolTemporalLayer: Vector[];
}
