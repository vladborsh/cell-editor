import { MoveMouse } from './move-mouse';
import { SaveHistory } from './save-history.action';
import { SetColor } from './set-color.action';
import { UpdateCell } from './update-cell.action';

export type Actions = UpdateCell | SetColor | MoveMouse | SaveHistory;
