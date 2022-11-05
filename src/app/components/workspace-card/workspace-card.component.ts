import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { Workspace } from '../../interfaces/workspace.interface';
import { RendererService } from '../../services/renderer/renderer.service';

@Component({
  selector: 'app-workspace-card',
  templateUrl: './workspace-card.component.html',
  styleUrls: ['./workspace-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceCardComponent implements AfterViewInit {
  @Input() workspace: Workspace;
  @ViewChild('canvasRef') canvas: ElementRef<HTMLCanvasElement>;

  @Output() remove = new EventEmitter<string>();

  constructor(private rendererService: RendererService) {}

  ngAfterViewInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    this.rendererService.render(context, this.workspace.state, true);
  }

  public onRemove(): void {
    this.remove.emit(this.workspace.id);
  }
}
