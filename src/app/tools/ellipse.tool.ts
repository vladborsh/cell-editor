import { Vector } from "../interfaces/vector.interface";
import { BresenhamEllipseAlgorithm } from "../renderering/bresenham-ellipse-algorithm";
import { UpdateCells } from "../store/actions/update-cells.action";
import { UpdateToolLayerCells } from "../store/actions/update-tool-layer-cells.action";
import { Store } from "../store/store";

const abs = Math.abs;

export class EllipseTool {
  private startPoint: Vector;
  private ellipseCenter: Vector;
  private ellipseRadiuses: Vector;

  constructor(
    private bresenhamEllipseAlgorithm: BresenhamEllipseAlgorithm,
    private store: Store,
  ) {}

  public onSetup(point: Vector): void {
    this.startPoint = point;
    this.ellipseRadiuses = { x: 0, y: 0 };
  }

  public onMove({ x, y }: Vector): void {
    console.log(this.startPoint, this.ellipseRadiuses)

    if (!this.startPoint || !this.ellipseRadiuses) {
      return;
    }

    this.ellipseCenter = {
      x: this.startPoint.x + (x - this.startPoint.x) / 2,
      y: this.startPoint.y + (y - this.startPoint.y) / 2,
    }

    this.ellipseRadiuses = {
      x: abs(this.ellipseCenter.x - this.startPoint.x),
      y: abs(this.ellipseCenter.y - this.startPoint.y),
    }

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
