import { Injectable } from '@angular/core';

import { Vector } from '../../interfaces/vector.interface';
import { UpdateCells } from '../../store/actions/update-cells.action';
import { UpdateToolLayerCells } from '../../store/actions/update-tool-layer-cells.action';
import { BresenhamLineAlgorithmService } from '../bresenham-line-algorithm/bresenham-line-algorithm.service';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class LineToolService {
  private startPoint: Vector;
  private endPoint: Vector;

  constructor(
    private store: StoreService,
    private bresenhamLineAlgorithm: BresenhamLineAlgorithmService,
  ) {}

  public onSetup(point: Vector): void {
    this.startPoint = point;
    this.endPoint = point;
  }

  public onMove(point: Vector): void {
    this.endPoint = point;
    this.store.dispatch(
      new UpdateToolLayerCells(
        this.bresenhamLineAlgorithm.getRenderPoints(this.startPoint, this.endPoint),
      ),
    );
  }

  public onDispose(): void {
    const { toolTemporalLayer } = this.store.getSnapshot();

    this.store.dispatch(new UpdateCells(toolTemporalLayer));
    this.store.dispatch(new UpdateToolLayerCells([]));

    this.startPoint = null;
    this.endPoint = null;
  }
}
