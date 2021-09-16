import { Tools } from '../enums/tools.enum';
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
  grid: string[][];
  history: string[][][];
  historyHead: number;
  tool: Tools;
  toolTemporalLayer: Vector[];
}
