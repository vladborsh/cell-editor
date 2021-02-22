import { Clear } from './clear.action';
import { MoveMouse } from './move-mouse.action';
import { Redo } from './redo.action';
import { SaveHistory } from './save-history.action';
import { SetColor } from './set-color.action';
import { SetTool } from './set-tool.action';
import { Undo } from './undo.action';
import { UpdateCell } from './update-cell.action';

export type Actions =
  UpdateCell
  | SetColor
  | MoveMouse
  | SaveHistory
  | SetTool
  | Undo
  | Redo
  | Clear;
