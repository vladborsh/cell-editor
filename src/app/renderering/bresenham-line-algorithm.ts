import { Vector } from "../interfaces/vector.interface";

const abs = Math.abs;

export class BresenhamLineAlgorithm {
  public getRenderPoints(startPoint: Vector, endPoint: Vector): Vector[] {
    if (abs(endPoint.y - startPoint.y) < abs(endPoint.x - startPoint.x)) {
      if (startPoint.x > endPoint.x) {
        return this.plotLineLow(endPoint, startPoint);
      } else {
        return this.plotLineLow(startPoint, endPoint);
      }
    } else {
      if (startPoint.y > endPoint.y) {
        return this.plotLineHigh(endPoint, startPoint);
      } else {
        return this.plotLineHigh(startPoint, endPoint);
      }
    }
  }

  private plotLineLow(startPoint: Vector, endPoint: Vector): Vector[] {
    const renderPoints: Vector[] = [];
    let dx = endPoint.x - startPoint.x;
    let dy = endPoint.y - startPoint.y;
    let yi = 1;

    if (dy < 0) {
      yi = -1;
      dy = -dy;
    }

    let D = (2 * dy) - dx;
    let y = startPoint.y;

    for (let x = startPoint.x; x <= endPoint.x; x++) {
      renderPoints.push({ x, y });

      if (D > 0) {
        y = y + yi;
        D = D + (2 * (dy - dx));
      } else {
        D = D + 2 * dy;
      }
    }

    return renderPoints;
  }

  private plotLineHigh(startPoint: Vector, endPoint: Vector): Vector[] {
    const renderPoints: Vector[] = [];
    let dx = endPoint.x - startPoint.x;
    let dy = endPoint.y - startPoint.y;
    let xi = 1;

    if (dx < 0) {
      xi = -1;
      dx = -dx;
    }

    let D = (2 * dx) - dy;
    let x = startPoint.x;

    for (let y = startPoint.y; y <= endPoint.y; y++) {
      renderPoints.push({ x, y });

      if (D > 0) {
        x = x + xi;
        D = D + (2 * (dx - dy));
      } else {
        D = D + 2 * dx;
      }
    }

    return renderPoints;
  }
}
