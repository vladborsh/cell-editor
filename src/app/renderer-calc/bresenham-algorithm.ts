import { Vector } from "../interfaces/vector.interface";

export class BresenhamAlgorithm {
  public getCircleRendering(center: Vector, radius: number): Vector[] {
    const pixelsBatch: Vector[] = [];

    let x = 0;
    let y = radius;
    let d = 3 - 2 * radius;
    pixelsBatch.push.apply(pixelsBatch, this.getAxiosPixels(center.x, center.y, radius));
    while (y >= x) {
      x++;
      if (d > 0) {
        y--;
        d = d + 4 * (x - y) + 10;
      } else {
        d = d + 4 * x + 6;
      }
      pixelsBatch.push.apply(pixelsBatch, this.getArcPixels(center.x, center.y, x, y));
    }

    return pixelsBatch
  }

  private getArcPixels(xc: number, yc: number, x: number, y: number): Vector[] {
    return [
      { x: xc + x, y: yc + y },
      { x: xc - x, y: yc + y },
      { x: xc + x, y: yc - y },
      { x: xc - x, y: yc - y },
      { x: xc + y, y: yc + x },
      { x: xc - y, y: yc + x },
      { x: xc + y, y: yc - x },
      { x: xc - y, y: yc - x },
    ]
  }

  private getAxiosPixels(xc: number, yc: number, r: number): Vector[] {
    return [
      { x: xc + r, y: yc },
      { x: xc - r, y: yc },
      { x: xc, y: yc - r },
      { x: xc, y: yc + r },
    ]
  }
}
