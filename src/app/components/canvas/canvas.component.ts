import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SaveHistory } from 'src/app/store/actions/save-history.action';

import { CanvasService } from '../../services/canvas/canvas.service';
import { CursorListenerService } from '../../services/cursor-listener/cursor-listener.service';
import { KeyboardListenersService } from '../../services/keyboard-listeners/keyboard-listeners.service';
import { RendererService } from '../../services/renderer/renderer.service';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasRef') canvas: ElementRef<HTMLCanvasElement>;

  public canvasWidth: number;
  public canvasHeight: number;

  private context: CanvasRenderingContext2D;

  constructor(
    private store: StoreService,
    private canvasService: CanvasService,
    private cursorListeners: CursorListenerService,
    private keyboardListeners: KeyboardListenersService,
    private renderService: RendererService,
  ) {}

  ngOnInit(): void {
    const { canvasHeight, canvasWidth } = this.store.getSnapshot();
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;

    this.store.subscribeToProp('canvasHeight', (value: number) => {
      this.canvasHeight = value;
    });

    this.store.subscribeToProp('canvasWidth', (value: number) => {
      this.canvasWidth = value;
    });

    this.store.dispatch(new SaveHistory());
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.canvasService.setCanvas(this.canvas.nativeElement);
    this.canvasService.setContext(this.context);
    this.cursorListeners.install();
    this.keyboardListeners.install();
    this.renderService.render();
  }
}
