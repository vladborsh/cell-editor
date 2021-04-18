import { Vector } from "../interfaces/vector.interface";
import { BresenhamLineAlgorithm } from "../renderering/bresenham-line-algorithm";
import { UpdateCells } from "../store/actions/update-cells.action";
import { UpdateToolLayerCells } from "../store/actions/update-tool-layer-cells.action";
import { Store } from "../store/store";

export class LineTool {
  private startPoint: Vector;
  private endPoint: Vector;

  constructor(private store: Store, private bresenhamLineAlgorithm: BresenhamLineAlgorithm) {}

  public onSetup(point: Vector): void {
    this.startPoint = point;
    this.endPoint = point;
  }

  public onMove(point: Vector): void {
    this.endPoint = point;
    this.store.dispatch(
      new UpdateToolLayerCells(
        this.bresenhamLineAlgorithm.getRenderPoints(
          this.startPoint,
          this.endPoint,
        ),
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
