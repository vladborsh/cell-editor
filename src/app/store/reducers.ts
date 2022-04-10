import { ActionTypes } from '../enums/actions-type.enum';
import { CanvasBoardState } from '../interfaces/global-state.interface';
import { HistoryFragment } from '../interfaces/history-fragment.interface';
import { copyHistoryFragment } from '../utils/copy.helper';
import { Actions } from './actions/actions';
import { AddLayer } from './actions/add-layer.action';
import { Clear } from './actions/clear.action';
import { CopyLayer } from './actions/copy-layer.action';
import { DeleteLayer } from './actions/delete-layer.action';
import { MoveMouse } from './actions/move-mouse.action';
import { Redo } from './actions/redo.action';
import { SaveHistory } from './actions/save-history.action';
import { SetActiveLayer } from './actions/set-layer.action';
import { SetTool } from './actions/set-tool.action';
import { Undo } from './actions/undo.action';
import { UpdateBrushSize } from './actions/update-brush-size.action';
import { UpdateCellSize } from './actions/update-cell-size.action';
import { UpdateCells } from './actions/update-cells.action';
import { UpdateColor } from './actions/update-color.action';
import { UpdateGridSize } from './actions/update-grid-size.action';
import { UpdateLayer } from './actions/update-layer.action';
import { UpdateToolLayerCells } from './actions/update-tool-layer-cells.action';
import { UpdateZoom } from './actions/update-zoom.action';
import { DEFAULT_SIZE } from './default-state';

const HISTORY_SIZE = 50;

function saveHistory(state: CanvasBoardState): { history: HistoryFragment[]; historyHead: number } {
  let historyHead;
  let history;

  if (!state.history) {
    state.history = [];
  }

  if (state.history.length === HISTORY_SIZE) {
    historyHead = state.historyHead;
    history = [
      ...state.history.slice(1, historyHead),
      copyHistoryFragment({
        grid: state.grid,
        activeLayer: state.activeLayer,
        layers: state.layers,
      }),
    ];
  } else {
    historyHead = state.historyHead + 1;
    history = [
      ...state.history.slice(0, historyHead),
      copyHistoryFragment({
        grid: state.grid,
        activeLayer: state.activeLayer,
        layers: state.layers,
      }),
    ];
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
      if (x >= 0 && x < state.grid[0].length && y >= 0 && y < state.grid[0][0].length) {
        state.grid[state.activeLayer][x][y] = state.color;
      }
    }
    return {
      ...state,
      grid: state.grid.map(i => i), // trigger grid layers subscriptions
    };
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
    if (state.historyHead > 0) {
      const historyHead = state.historyHead - 1;
      return {
        ...state,
        ...copyHistoryFragment(state.history[historyHead]),
        historyHead,
      };
    }

    return state;
  },
  [ActionTypes.REDO]: (_: Redo, state: CanvasBoardState) => {
    if (state.historyHead < state.history.length - 1) {
      const historyHead = state.historyHead + 1;
      return {
        ...state,
        historyHead,
        ...copyHistoryFragment(state.history[historyHead]),
      };
    }

    return state;
  },
  [ActionTypes.CLEAR]: (_: Clear, state: CanvasBoardState) => {
    const clearedGrid = Array.from({ length: DEFAULT_SIZE }, () =>
      Array.from({ length: DEFAULT_SIZE }, () => 'ffffff'),
    );

    const stateGrid = state.grid.map((item, i) => (i === state.activeLayer ? clearedGrid : item));
    return {
      ...state,
      ...saveHistory({
        ...state,
        grid: stateGrid,
      }),
      grid: stateGrid,
    };
  },
  [ActionTypes.ADD_LAYER]: (_: AddLayer, state: CanvasBoardState) => {
    const layers = state.layers;
    const lastLayerName = layers[layers.length - 1]?.name;
    const lastLayerIndex = Number(lastLayerName.split('_')[1]);

    return {
      ...state,
      grid: [
        ...state.grid,
        Array.from({ length: state.cellNumberX }, () =>
          Array.from({ length: state.cellNumberY }, () => ''),
        ),
      ],
      activeLayer: layers.length,
      layers: [
        ...state.layers,
        { name: `Layer_${lastLayerIndex + 1}`, opacity: 100, isShown: true },
      ],
    };
  },
  [ActionTypes.COPY_LAYER]: ({ name }: CopyLayer, state: CanvasBoardState) => {
    const layers = state.layers;
    const lastLayerName = layers[layers.length - 1]?.name;
    const lastLayerIndex = Number(lastLayerName.split('_')[1]);
    const toCopyLayerIndex = state.layers.findIndex(iLayer => iLayer.name === name);

    return {
      ...state,
      grid: [...state.grid, state.grid[toCopyLayerIndex].map(row => [...row])],
      activeLayer: layers.length,
      layers: [
        ...state.layers,
        { name: `Layer_${lastLayerIndex + 1}`, opacity: 100, isShown: true },
      ],
    };
  },
  [ActionTypes.UPDATE_LAYER]: ({ layer }: UpdateLayer, state: CanvasBoardState) => {
    const index = state.layers.findIndex(iLayer => iLayer.name === layer.name);

    return {
      ...state,
      layers: state.layers.map((iLayer, i) => (i === index ? { ...iLayer, ...layer } : iLayer)),
    };
  },
  [ActionTypes.DELETE_LAYER]: ({ name }: DeleteLayer, state: CanvasBoardState) => {
    const index = state.layers.findIndex(layer => layer.name === name);
    const activeLayerInitial = state.activeLayer === index ? index - 1 : state.activeLayer;
    const activeLayer =
      activeLayerInitial === state.layers.length - 1 ? activeLayerInitial - 1 : activeLayerInitial;

    return {
      ...state,
      activeLayer,
      layers: state.layers.filter(layer => layer.name !== name),
      grid: [...state.grid.slice(0, index), ...state.grid.slice(index + 1, state.grid.length)],
    };
  },
  [ActionTypes.SET_ACTIVE_LAYER]: ({ num }: SetActiveLayer, state: CanvasBoardState) => {
    return {
      ...state,
      activeLayer: num,
    };
  },
};
