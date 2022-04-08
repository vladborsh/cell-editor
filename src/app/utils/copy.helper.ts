import { HistoryFragment } from '../interfaces/history-fragment.interface';

export function copyHistoryFragment(fragment: HistoryFragment): HistoryFragment {
  const newArr = [];

  for (const layer of fragment.grid) {
    const newLayer = [];
    for (const row of layer) {
      newLayer.push([...row]);
    }
    newArr.push([...newLayer]);
  }

  return {
    grid: newArr,
    activeLayer: fragment.activeLayer,
    layers: fragment.layers.map(iLayer => ({ ...iLayer })),
  };
}
