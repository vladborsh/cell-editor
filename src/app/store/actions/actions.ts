import { Clear } from './clear.action';
import { MoveMouse } from './move-mouse.action';
import { Redo } from './redo.action';
import { SaveHistory } from './save-history.action';
import { UpdateColor } from './update-color.action';
import { SetTool } from './set-tool.action';
import { Undo } from './undo.action';
import { UpdateCells } from './update-cells.action';
import { UpdateBrushSize } from './update-brush-size.action';

export type Actions =
  UpdateCells
  | UpdateColor
  | MoveMouse
  | SaveHistory
  | SetTool
  | Undo
  | Redo
  | Clear
  | UpdateBrushSize;
