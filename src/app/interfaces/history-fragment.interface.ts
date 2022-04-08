import { Layer } from './layer.interface';

export interface HistoryFragment {
  grid: string[][][];
  activeLayer: number;
  layers: Layer[];
}
