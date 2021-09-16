import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Workspace } from 'src/app/interfaces/workspace.interface';

@Component({
  selector: 'app-workspace-card',
  templateUrl: './workspace-card.component.html',
  styleUrls: ['./workspace-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceCardComponent {
  @Input() workspace: Workspace;

  @Output() remove = new EventEmitter<string>();

  public onRemove(): void {
    this.remove.emit(this.workspace.id);
  }
}
