import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  public context: CanvasRenderingContext2D | null;
  public canvas: HTMLCanvasElement;
  public readonly className = 'canvas-box';

  setCanvas(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
  }

  setContext(context: CanvasRenderingContext2D): void {
    this.context = context;
  }

  getBoundingRect(): DOMRect {
    return this.canvas.getBoundingClientRect();
  }

  subscribe(event: string, handler: (event: Event) => void): void {
    this.canvas.addEventListener(event, handler);
  }
}
