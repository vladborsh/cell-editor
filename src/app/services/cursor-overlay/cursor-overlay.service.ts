import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

import { CanvasService } from '../canvas/canvas.service';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class CursorOverlayService {
  private overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private canvas: CanvasService,
    private store: StoreService,
  ) {}

  public open<T>(component: ComponentType<T>): void {
    const { x, y } = this.canvas.getBoundingRect();
    const { cursorPosition } = this.store.getSnapshot();
    const positionX = x + cursorPosition.x;
    const positionY = y + cursorPosition.y;

    const config: OverlayConfig = {
      positionStrategy: this.overlay
        .position()
        .global()
        .left(`${positionX}px`)
        .top(`${positionY}px`),
    };

    this.overlayRef = this.overlay.create(config);
    const portal = new ComponentPortal(component);

    this.overlayRef.attach(portal);
  }

  public clickOutside(): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
