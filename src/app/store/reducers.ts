import { ActionTypes } from '../enums/actions-type.enum';
import { CanvasBoardState } from '../interfaces/global-state.interface';
import { copy } from '../utils/copy.helper';
import { Actions } from './actions/actions';
import { Clear } from './actions/clear.action';
import { MoveMouse } from './actions/move-mouse.action';
import { Redo } from './actions/redo.action';
import { SaveHistory } from './actions/save-history.action';
import { SetTool } from './actions/set-tool.action';
import { Undo } from './actions/undo.action';
import { UpdateBrushSize } from './actions/update-brush-size.action';
import { UpdateCellSize } from './actions/update-cell-size.action';
import { UpdateCells } from './actions/update-cells.action';
import { UpdateColor } from './actions/update-color.action';
import { UpdateGridSize } from './actions/update-grid-size.action';
import { UpdateToolLayerCells } from './actions/update-tool-layer-cells.action';
import { UpdateZoom } from './actions/update-zoom.action';
import { DEFAULT_SIZE } from './default-state';

const HISTORY_SIZE = 50;

function saveHistory(state: CanvasBoardState): { history: string[][][]; historyHead: number } {
  let historyHead;
  let history;

  if (!state.history) {
    state.history = [];
  }

  if (state.history.length === HISTORY_SIZE) {
    historyHead = state.historyHead;
    history = [...state.history.slice(1, historyHead), copy(state.grid)];
  } else {
    historyHead = state.historyHead + 1;
    history = [...state.history.slice(0, historyHead), copy(state.grid)];
  }

  return {
    history,
    historyHead,
  };
}

export const reducers: Record<
  ActionTypes,
  (action: Actions, state: CanvasBoardState) => CanvasBoardState
> = {
  [ActionTypes.MOVE_MOUSE]: (action: MoveMouse, state: CanvasBoardState) => {
    return { ...state, cursorPosition: action.position };
  },
  [ActionTypes.SAVE_HISTORY]: (_action: SaveHistory, state: CanvasBoardState) => {
    return {
      ...state,
      ...saveHistory(state),
    };
  },
  [ActionTypes.UPDATE_COLOR]: ({ color }: UpdateColor, state: CanvasBoardState) => {
    return { ...state, color };
  },
  [ActionTypes.UPDATE_BRUSH_SIZE]: ({ brushSize }: UpdateBrushSize, state: CanvasBoardState) => {
    return { ...state, brushSize };
  },
  [ActionTypes.UPDATE_CELL_SIZE]: ({ cellSize }: UpdateCellSize, state: CanvasBoardState) => {
    return { ...state, cellSize };
  },
  [ActionTypes.UPDATE_GRID_SIZE]: ({ newGridSize }: UpdateGridSize, state: CanvasBoardState) => {
    const newGrid = [];

    for (let i = 0; i < newGridSize.x; i++) {
      newGrid.push([]);
      for (let j = 0; j < newGridSize.y; j++) {
        if (state.grid[i]) {
          newGrid[i].push(state.grid[i][j] || null);
        } else {
          newGrid[i].push(null);
        }
      }
    }

    return {
      ...state,
      cellNumberX: newGridSize.y,
      cellNumberY: newGridSize.x,
      canvasHeight: newGridSize.y * state.cellSize,
      canvasWidth: newGridSize.x * state.cellSize,
      grid: newGrid,
    };
  },
  [ActionTypes.UPDATE_ZOOM]: ({ zoom }: UpdateZoom, state: CanvasBoardState) => {
    const ratio = zoom / state.cellSize;

    return {
      ...state,
      cellSize: zoom,
      canvasHeight: state.cellNumberY * zoom,
      canvasWidth: state.cellNumberX * zoom,
      cursorPosition: { x: state.cursorPosition.x * ratio, y: state.cursorPosition.y * ratio },
    };
  },
  [ActionTypes.UPDATE_CELLS]: ({ positions }: UpdateCells, state: CanvasBoardState) => {
    for (const { x, y } of positions) {
      if (x >= 0 && x < state.grid.length && y >= 0 && y < state.grid[0].length) {
        state.grid[x][y] = state.color;
      }
    }
    return state;
  },
  [ActionTypes.UPDATE_TOOL_LAYER_CELLS]: (
    { positions }: UpdateToolLayerCells,
    state: CanvasBoardState,
  ) => {
    return { ...state, toolTemporalLayer: positions };
  },
  [ActionTypes.SET_TOOL]: ({ tool }: SetTool, state: CanvasBoardState) => {
    if (state.tool !== tool) {
      return { ...state, tool };
    }
    return state;
  },
  [ActionTypes.UNDO]: (_: Undo, state: CanvasBoardState) => {
    console.log('undo');
    console.log(state.historyHead);
    console.log(state.history);
    if (state.historyHead > 0) {
      const historyHead = state.historyHead - 1;
      return { ...state, historyHead, grid: copy(state.history[historyHead]) };
    }

    return state;
  },
  [ActionTypes.REDO]: (_: Redo, state: CanvasBoardState) => {
    if (state.historyHead < state.history.length - 1) {
      const historyHead = state.historyHead + 1;
      return { ...state, historyHead, grid: copy(state.history[historyHead]) };
    }

    return state;
  },
  [ActionTypes.CLEAR]: (_: Clear, state: CanvasBoardState) => {
    const grid = Array.from({ length: DEFAULT_SIZE }, () =>
      Array.from({ length: DEFAULT_SIZE }, () => 'ffffff'),
    );

    return {
      ...state,
      ...saveHistory({ ...state, grid }),
      grid,
    };
  },
};
