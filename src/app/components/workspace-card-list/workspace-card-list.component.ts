import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Workspace } from 'src/app/interfaces/workspace.interface';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogOutput } from '../confirmation-dialog/confirmation-dialog-output.enum';

@Component({
  selector: 'app-workspace-card-list',
  templateUrl: './workspace-card-list.component.html',
  styleUrls: ['./workspace-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceCardListComponent implements OnInit {
  public workspaces$: Observable<Workspace[]>;

  constructor(
    private workspaceService: WorkspaceService,
    private matDialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.workspaces$ = this.workspaceService.getItemList$();
  }

  public trackById(workspace: Workspace): string {
    return workspace.id;
  }

  public onSelect(id: string): void {
    this.router.navigate([`workspace/${id}`]);
  }

  public onRemove(id: string): void {
    this.matDialog
      .open(ConfirmationDialogComponent, {
        data: {
          text: 'Do you really want to remove this workspace?',
          submitBtnLabel: 'Yes, Remove',
          cancelBtnLabel: 'Cancel',
        },
      })
      .afterClosed()
      .pipe(
        filter((result: ConfirmationDialogOutput) => result === ConfirmationDialogOutput.CONFIRMED),
      )
      .subscribe(() => this.workspaceService.remove(id));
  }
}
