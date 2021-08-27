import { Injectable } from '@angular/core';

import { Vector } from '../../interfaces/vector.interface';
import { UpdateCells } from '../../store/actions/update-cells.action';
import { UpdateToolLayerCells } from '../../store/actions/update-tool-layer-cells.action';
import { abs } from '../../utils/abs.helper';
import { BresenhamEllipseAlgorithmService } from '../bresenham-ellipse-algorithm/bresenham-ellipse-algorithm.service';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class EllipseToolService {
  private startPoint: Vector;
  private ellipseCenter: Vector;
  private ellipseRadiuses: Vector;

  constructor(
    private bresenhamEllipseAlgorithm: BresenhamEllipseAlgorithmService,
    private store: StoreService,
  ) {}

  public onSetup(point: Vector): void {
    this.startPoint = point;
    this.ellipseRadiuses = { x: 0, y: 0 };
  }

  public onMove({ x, y }: Vector): void {
    if (!this.startPoint || !this.ellipseRadiuses) {
      return;
    }

    this.ellipseCenter = {
      x: this.startPoint.x + (x - this.startPoint.x) / 2,
      y: this.startPoint.y + (y - this.startPoint.y) / 2,
    };

    this.ellipseRadiuses = {
      x: abs(this.ellipseCenter.x - this.startPoint.x),
      y: abs(this.ellipseCenter.y - this.startPoint.y),
    };

    this.store.dispatch(
      new UpdateToolLayerCells(
        this.bresenhamEllipseAlgorithm.getRenderPoints(this.ellipseCenter, this.ellipseRadiuses),
      ),
    );
  }

  public onDispose(): void {
    const { toolTemporalLayer } = this.store.getSnapshot();

    this.store.dispatch(new UpdateCells(toolTemporalLayer));
    this.store.dispatch(new UpdateToolLayerCells([]));

    this.startPoint = null;
    this.ellipseRadiuses = null;
  }
}
