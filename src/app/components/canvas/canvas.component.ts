import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter, switchMap, take, takeUntil } from 'rxjs/operators';
import { CanvasBoardState } from 'src/app/interfaces/global-state.interface';
import { Workspace } from 'src/app/interfaces/workspace.interface';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';

import { CanvasService } from '../../services/canvas/canvas.service';
import { CursorListenerService } from '../../services/cursor-listener/cursor-listener.service';
import { DestroyService } from '../../services/destroy/destroy.service';
import { KeyboardListenersService } from '../../services/keyboard-listeners/keyboard-listeners.service';
import { RendererService } from '../../services/renderer/renderer.service';
import { StoreService } from '../../services/store/store.service';
import { SaveHistory } from '../../store/actions/save-history.action';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasRef') canvas: ElementRef<HTMLCanvasElement>;

  public canvasWidth$ = new BehaviorSubject<number>(0);
  public canvasHeight$ = new BehaviorSubject<number>(0);
  public canvasStore$ = new BehaviorSubject<CanvasBoardState>(null);

  private context: CanvasRenderingContext2D;
  private canvasStoreInitialized$ = new BehaviorSubject<boolean>(false);

  constructor(
    private store: StoreService,
    private canvasService: CanvasService,
    private cursorListeners: CursorListenerService,
    private keyboardListeners: KeyboardListenersService,
    private renderService: RendererService,
    private activatedRoute: ActivatedRoute,
    private workspaceService: WorkspaceService,
    private destroy$: DestroyService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.workspaceService.getItemOnce(id)),
        takeUntil(this.destroy$),
      )
      .subscribe((workspace: Workspace) => this.setStore(workspace));
  }

  ngAfterViewInit(): void {
    this.canvasStoreInitialized$.pipe(filter(Boolean), take(1)).subscribe(() => {
      this.context = this.canvas.nativeElement.getContext('2d');
      this.canvasService.setCanvas(this.canvas.nativeElement);
      this.canvasService.setContext(this.context);
      this.cursorListeners.install();
      this.keyboardListeners.install();
      this.renderService.render();
    });
  }

  private setStore(workspace: Workspace): void {
    this.store.install(workspace.state);

    if (!workspace.state) {
      this.workspaceService.update(workspace.id, {
        ...workspace,
        state: this.store.getSnapshot(),
      });
    }

    const { canvasHeight, canvasWidth } = this.store.getSnapshot();
    this.canvasHeight$.next(canvasHeight);
    this.canvasWidth$.next(canvasWidth);

    this.store.subscribeToProp('canvasHeight', (value: number) => {
      this.canvasHeight$.next(value);
    });

    this.store.subscribeToProp('canvasWidth', (value: number) => {
      this.canvasWidth$.next(value);
    });

    this.store.dispatch(new SaveHistory());

    this.store.subscribe(state => this.canvasStore$.next(state));

    this.canvasStore$.pipe(debounceTime(2_000), takeUntil(this.destroy$)).subscribe(state =>
      this.workspaceService.update(workspace.id, {
        ...workspace,
        state,
      }),
    );

    this.canvasStoreInitialized$.next(true);
  }
}
