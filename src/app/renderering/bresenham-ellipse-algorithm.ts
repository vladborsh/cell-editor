import { Vector } from '../interfaces/vector.interface';

export class BresenhamEllipseAlgorithm {
  public getRenderPoints(center: Vector, radiuses: Vector): Vector[] {
    const pixelsBatch: Vector[] = [];

    let dx: number, dy: number, d1: number, d2: number, x: number, y: number;
    x = 0;
    y = radiuses.y;

    // Initial decision parameter of region 1
    d1 = pow2(radiuses.y) - pow2(radiuses.x) * radiuses.y + 0.25 * pow2(radiuses.x);
    dx = 2 * pow2(radiuses.y) * x;
    dy = 2 * pow2(radiuses.x) * y;

    // For region 1
    while (dx < dy) {
      // Print points based on 4-way symmetry
      pixelsBatch.push({ x: x + center.x, y: y + center.y });
      pixelsBatch.push({ x: -x + center.x, y: y + center.y });
      pixelsBatch.push({ x: x + center.x, y: -y + center.y });
      pixelsBatch.push({ x: -x + center.x, y: -y + center.y });

      // Checking and updating value of decision parameter based on algorithm
      if (d1 < 0) {
        x++;
        dx = dx + 2 * pow2(radiuses.y);
        d1 = d1 + dx + pow2(radiuses.y);
      } else {
        x++;
        y--;
        dx = dx + 2 * pow2(radiuses.y);
        dy = dy - 2 * pow2(radiuses.x);
        d1 = d1 + dx - dy + pow2(radiuses.y);
      }
    }

    // Decision parameter of region 2
    d2 = pow2(radiuses.y) * ((x + 0.5) * (x + 0.5)) + pow2(radiuses.x) * ((y - 1) * (y - 1)) - pow2(radiuses.x) * pow2(radiuses.y);

    // Plotting points of region 2
    while (y >= 0) {
      // Print points based on 4-way symmetry
      pixelsBatch.push({ x: x + center.x, y: y + center.y });
      pixelsBatch.push({ x: -x + center.x, y: y + center.y });
      pixelsBatch.push({ x: x + center.x, y: -y + center.y });
      pixelsBatch.push({ x: -x + center.x, y: -y + center.y });

      // Checking and updating parameter value based on algorithm
      if (d2 > 0) {
        y--;
        dy = dy - 2 * pow2(radiuses.x);
        d2 = d2 + pow2(radiuses.x) - dy;
      } else {
        y--;
        x++;
        dx = dx + 2 * pow2(radiuses.y);
        dy = dy - 2 * pow2(radiuses.x);
        d2 = d2 + dx - dy + pow2(radiuses.x);
      }
    }

    return pixelsBatch.map(({x ,y}) => ({ x: Math.ceil(x), y: Math.ceil(y) }));
  }
}

const pow2 = (x: number) => Math.pow(x, 2);
