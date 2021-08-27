import { Injectable } from '@angular/core';

import { Vector } from '../../interfaces/vector.interface';
import { UpdateCells } from '../../store/actions/update-cells.action';
import { UpdateToolLayerCells } from '../../store/actions/update-tool-layer-cells.action';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class RectangleToolService {
  private startPoint: Vector;
  private endPoint: Vector;

  constructor(private store: StoreService) {}

  public onSetup(point: Vector): void {
    this.startPoint = point;
    this.endPoint = point;
  }

  public onMove(point: Vector): void {
    this.endPoint = point;
    this.store.dispatch(
      new UpdateToolLayerCells(this.getRenderPoints(this.startPoint, this.endPoint)),
    );
  }

  public onDispose(): void {
    const { toolTemporalLayer } = this.store.getSnapshot();

    this.store.dispatch(new UpdateCells(toolTemporalLayer));
    this.store.dispatch(new UpdateToolLayerCells([]));

    this.startPoint = null;
    this.endPoint = null;
  }

  private getRenderPoints(startPoint: Vector, endPoint: Vector): Vector[] {
    const renderPoints: Vector[] = [];
    const dx = endPoint.x - startPoint.x;
    const signX = dx < 0 ? -1 : 1;
    const dy = endPoint.y - startPoint.y;
    const signY = dy < 0 ? -1 : 1;

    for (let x = startPoint.x; x !== endPoint.x; x += signX) {
      renderPoints.push({ x, y: startPoint.y });
      renderPoints.push({ x, y: endPoint.y });
    }

    for (let y = startPoint.y; y !== endPoint.y; y += signY) {
      renderPoints.push({ x: startPoint.x, y });
      renderPoints.push({ x: endPoint.x, y });
    }

    renderPoints.push({ x: endPoint.x, y: endPoint.y });

    return renderPoints;
  }
}
