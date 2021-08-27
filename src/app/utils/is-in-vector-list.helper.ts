import { Vector } from '../interfaces/vector.interface';

export function isInVectorList(position: Vector, stack: Vector[]): boolean {
  return !!stack.find(({ x, y }) => x === position.x && y === position.y);
}
