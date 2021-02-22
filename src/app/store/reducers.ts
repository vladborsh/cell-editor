import { Actions } from '../actions/actions';
import { MoveMouse } from '../actions/move-mouse.action';
import { Redo } from '../actions/redo.action';
import { SaveHistory } from '../actions/save-history.action';
import { SetColor } from '../actions/set-color.action';
import { SetTool } from '../actions/set-tool.action';
import { Undo } from '../actions/undo.action';
import { UpdateCell } from '../actions/update-cell.action';
import { ActionTypes } from '../enums/actions-type.enum';
import { GlobalState } from '../interfaces/global-state.interface';
import { copy } from '../utils/copy.helper';

export const reducers: Record<ActionTypes, (action: Actions, state: GlobalState) => GlobalState> = {
  [ActionTypes.MOVE_MOUSE]: (action: MoveMouse, state: GlobalState) => {
    return { ...state, cursorPosition: action.position };
  },
  [ActionTypes.SAVE_HISTORY]: (_action: SaveHistory, state: GlobalState) => {
    const historyHead = state.historyHead + 1;
    const gridHistory = [...state.history.slice(0, historyHead), copy(state.grid)];

    return {
      ...state,
      gridHistory,
      historyHead,
    };
  },
  [ActionTypes.SET_COLOR]: ({ color }: SetColor, state: GlobalState) => {
    return { ...state, color };
  },
  [ActionTypes.UPDATE_CELL]: ({ position: { x, y } }: UpdateCell, state: GlobalState) => {
    if (x >= 0 && x < state.grid.length && y >= 0 && y < state.grid[0].length) {
      state.grid[x][y] = state.color;
    }
    return state;
  },
  [ActionTypes.SET_TOOL]: ({ tool }: SetTool, state: GlobalState) => {
    if (state.tool !== tool) {
      return { ...state, tool };
    }
    return state;
  },
  [ActionTypes.UNDO]: (_: Undo, state: GlobalState) => {
    if (state.historyHead > 0) {
      const head = state.historyHead - 1;
      return { ...state, historyHead: head, grid: state.history[head] };
    }

    return state;
  },
  [ActionTypes.REDO]: (_: Redo, state: GlobalState) => {
    if (state.historyHead < state.history.length - 1) {
      const head = state.historyHead + 1;
      return { ...state, historyHead: head, grid: state.history[head] };
    }

    return state;
  },
};

