import { Tools } from '../enums/tools.enum';
import { CanvasBoardState } from '../interfaces/global-state.interface';
import { AddLayer } from './actions/add-layer.action';
import { Redo } from './actions/redo.action';
import { SaveHistory } from './actions/save-history.action';
import { Undo } from './actions/undo.action';
import { UpdateCells } from './actions/update-cells.action';
import { UpdateColor } from './actions/update-color.action';
import { reducers } from './reducers';

const reduceAll = (actions, state) =>
  actions.reduce((currentState, action) => reducers[action.type](action, currentState), state);

describe('reducers', () => {
  let state: CanvasBoardState;
  const DEFAULT_STEP = 3;

  beforeEach(() => {
    const height = 3;
    const width = 3;

    state = {
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
  });

  describe('it should handle drawing: ', () => {
    it('draw single cell', () => {
      const updateCellsAction = new UpdateCells([{ x: 1, y: 1 }]);

      state = reducers[updateCellsAction.type](updateCellsAction, state);

      expect(state.grid).toEqual([
        [
          ['', '', ''],
          ['', '333333', ''],
          ['', '', ''],
        ],
      ]);
    });

    it('draw multiple cell', () => {
      const updateCellsAction = new UpdateCells([
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ]);

      state = reducers[updateCellsAction.type](updateCellsAction, state);

      expect(state.grid).toEqual([
        [
          ['', '', ''],
          ['', '333333', ''],
          ['', '333333', ''],
        ],
      ]);
    });

    it('draw between layers', () => {
      const actions = [
        new UpdateCells([
          { x: 1, y: 1 },
          { x: 2, y: 1 },
        ]),
        new AddLayer(),
        new UpdateCells([
          { x: 0, y: 2 },
          { x: 1, y: 2 },
        ]),
      ];

      state = reduceAll(actions, state);

      expect(state.grid).toEqual([
        [
          ['', '', ''],
          ['', '333333', ''],
          ['', '333333', ''],
        ],
        [
          ['', '', '333333'],
          ['', '', '333333'],
          ['', '', ''],
        ],
      ]);
    });

    it('draw between layers and undo action', () => {
      const actions = [
        new UpdateCells([
          { x: 1, y: 1 },
          { x: 2, y: 1 },
        ]),
        new SaveHistory(),
        new AddLayer(),
        new SaveHistory(),
        new UpdateCells([
          { x: 0, y: 2 },
          { x: 1, y: 2 },
        ]),
        new SaveHistory(),
        new Undo(),
      ];

      state = reduceAll(actions, state);

      expect(state.grid).toEqual([
        [
          ['', '', ''],
          ['', '333333', ''],
          ['', '333333', ''],
        ],
        [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      ]);
    });

    it('draw between layers and undo and redo action', () => {
      const actions = [
        new UpdateCells([
          { x: 1, y: 1 },
          { x: 2, y: 1 },
        ]),
        new SaveHistory(),
        new AddLayer(),
        new SaveHistory(),
        new UpdateCells([
          { x: 0, y: 2 },
          { x: 1, y: 2 },
        ]),
        new SaveHistory(),
        new Undo(),
        new Redo(),
      ];

      state = reduceAll(actions, state);

      expect(state.grid).toEqual([
        [
          ['', '', ''],
          ['', '333333', ''],
          ['', '333333', ''],
        ],
        [
          ['', '', '333333'],
          ['', '', '333333'],
          ['', '', ''],
        ],
      ]);
    });

    it('draw between layers with color change', () => {
      const actions = [
        new UpdateCells([
          { x: 1, y: 1 },
          { x: 2, y: 1 },
        ]),
        new SaveHistory(),
        new AddLayer(),
        new SaveHistory(),
        new UpdateColor('3377aa'),
        new UpdateCells([
          { x: 0, y: 2 },
          { x: 1, y: 2 },
        ]),
        new SaveHistory(),
      ];

      state = reduceAll(actions, state);

      expect(state.grid).toEqual([
        [
          ['', '', ''],
          ['', '333333', ''],
          ['', '333333', ''],
        ],
        [
          ['', '', '3377aa'],
          ['', '', '3377aa'],
          ['', '', ''],
        ],
      ]);
    });
  });

  describe('should process layers:', () => {
    it('create layer', () => {
      const actions = [
        new UpdateCells([
          { x: 1, y: 1 },
          { x: 2, y: 1 },
        ]),
        new SaveHistory(),
        new AddLayer(),
        new SaveHistory(),
      ];

      state = reduceAll(actions, state);

      expect(state.grid).toEqual([
        [
          ['', '', ''],
          ['', '333333', ''],
          ['', '333333', ''],
        ],
        [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      ]);
      expect(state.activeLayer).toEqual(1);
      expect(state.layers).toEqual([{ name: 'Layer_0' }, { name: 'Layer_1' }]);
    });

    it('undo layer creation', () => {
      const actions = [
        new UpdateCells([
          { x: 1, y: 1 },
          { x: 2, y: 1 },
        ]),
        new SaveHistory(),
        new AddLayer(),
        new SaveHistory(),
        new Undo(),
      ];

      state = reduceAll(actions, state);

      expect(state.grid).toEqual([
        [
          ['', '', ''],
          ['', '333333', ''],
          ['', '333333', ''],
        ],
      ]);
      expect(state.activeLayer).toEqual(0);
      expect(state.layers).toEqual([{ name: 'Layer_0' }]);
    });

    it('redo layer creation', () => {
      const actions = [
        new UpdateCells([
          { x: 1, y: 1 },
          { x: 2, y: 1 },
        ]),
        new SaveHistory(),
        new AddLayer(),
        new SaveHistory(),
        new Undo(),
        new Redo(),
      ];

      state = reduceAll(actions, state);

      expect(state.grid).toEqual([
        [
          ['', '', ''],
          ['', '333333', ''],
          ['', '333333', ''],
        ],
        [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      ]);
      expect(state.activeLayer).toEqual(1);
      expect(state.layers).toEqual([{ name: 'Layer_0' }, { name: 'Layer_1' }]);
    });
  });
});
