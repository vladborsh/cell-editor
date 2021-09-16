import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConfirmationDialogConfig } from './confirmation-dialog-config.interface';
import { ConfirmationDialogOutput } from './confirmation-dialog-output.enum';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  constructor(
    @Optional()
    private matDialogRef: MatDialogRef<ConfirmationDialogComponent, ConfirmationDialogOutput>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogConfig,
  ) {}

  public cancel(): void {
    this.matDialogRef.close(ConfirmationDialogOutput.CANCELLED);
  }

  public confirm(): void {
    this.matDialogRef.close(ConfirmationDialogOutput.CONFIRMED);
  }
}
