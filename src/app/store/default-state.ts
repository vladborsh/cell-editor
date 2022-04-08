import { Tools } from '../enums/tools.enum';
import { CanvasBoardState } from '../interfaces/global-state.interface';

export const DEFAULT_SIZE = 50;
const DEFAULT_STEP = 10;

export function getDefaultState(
  width: number = DEFAULT_SIZE,
  height: number = DEFAULT_SIZE,
): CanvasBoardState {
  return {
    canvasHeight: DEFAULT_STEP * height,
    canvasWidth: DEFAULT_STEP * width,
    color: '333333',
    defaultColor: 'ffffff',
    cursorPosition: { x: 0, y: 0 },
    brushSize: 1,
    cellSize: DEFAULT_STEP,
    cellNumberY: height,
    cellNumberX: width,
    activeLayer: 0,
    grid: [Array.from({ length: width }, () => Array.from({ length: height }, () => ''))],
    layers: [
      {
        name: 'Layer_0',
      },
    ],
    history: [],
    historyHead: -1,
    tool: Tools.BRUSH,
    toolTemporalLayer: [],
  };
}
