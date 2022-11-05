import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, delay, filter, switchMap, take, takeUntil } from 'rxjs/operators';
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
export class CanvasComponent implements OnInit, OnDestroy {
  @ViewChild('canvasRef') canvas: ElementRef<HTMLCanvasElement>;

  public workspace$: Observable<Workspace>;
  public canvasWidth$: Observable<number>;
  public canvasHeight$: Observable<number>;
  public canvasStore$ = new BehaviorSubject<CanvasBoardState>(null);
  public isReady$ = this.store.isReady$;

  private context: CanvasRenderingContext2D;

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
    this.workspace$ = this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.workspaceService.getItemOnce(id)),
      filter(workspace => !!workspace),
      takeUntil(this.destroy$),
    );

    this.workspace$.pipe(take(1)).subscribe((workspace: Workspace) => this.setStore(workspace));
    this.canvasHeight$ = this.store.select('canvasHeight');
    this.canvasWidth$ = this.store.select('canvasWidth');

    this.setCanvassOnReadiness();
  }

  ngOnDestroy(): void {
    this.store.unready();
    this.destroy$.next();
  }

  private setStore(workspace: Workspace): void {
    this.store.install(workspace.state);

    this.store.dispatch(new SaveHistory());

    this.store.subscribe(state => {
      if (state) {
        this.canvasStore$.next(state);
      }
    });

    this.canvasStore$
      .pipe(
        filter(state => !!state),
        debounceTime(2_000),
        takeUntil(this.destroy$),
      )
      .subscribe(state =>
        this.workspaceService.update(workspace.id, {
          ...workspace,
          state,
        }),
      );
  }

  private setCanvassOnReadiness(): void {
    this.store.isReady$.pipe(filter(Boolean), delay(100), take(1)).subscribe(() => {
      this.context = this.canvas.nativeElement.getContext('2d');
      this.canvasService.setCanvas(this.canvas.nativeElement);
      this.canvasService.setContext(this.context);
      this.cursorListeners.install();
      this.keyboardListeners.install();

      const animate = () =>
        requestAnimationFrame(() => {
          this.renderService.render(this.context, this.store.getSnapshot());
          animate();
        });
      animate();
    });
  }
}
