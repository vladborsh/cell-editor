import { Tools } from '../enums/tools.enum';
import { GlobalState } from '../interfaces/global-state.interface';

export const DEFAULT_SIZE = 40;
const DEFAULT_STEP = 10;

export const defaultState: GlobalState = {
  canvasHeight: DEFAULT_SIZE * DEFAULT_STEP,
  canvasWidth: DEFAULT_SIZE * DEFAULT_STEP,
  color: '333333',
  defaultColor: 'ffffff',
  cursorPosition: { x: 0, y: 0 },
  brushSize: 1,
  cellSize: DEFAULT_STEP,
  cellNumberY: DEFAULT_SIZE,
  cellNumberX: DEFAULT_SIZE,
  grid: Array.from({ length: DEFAULT_SIZE }, () => Array.from({ length: DEFAULT_SIZE }, () => 'ffffff')),
  history: [],
  historyHead: -1,
  tool: Tools.BRUSH,
};
