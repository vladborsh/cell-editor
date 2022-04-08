import { ChangeDetectionStrategy, Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';

@Component({
  selector: 'app-new-workspace',
  templateUrl: './new-workspace.component.html',
  styleUrls: ['./new-workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewWorkspaceComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private workspaceService: WorkspaceService,
    private formBuilder: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<void>,
  ) {}

  ngOnInit(): void {
    this.form = this.getForm();
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.workspaceService.create(this.form.value).subscribe();

      // this.router.navigate([`workspace/${id}`]);
    }

    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  private getForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      gridSizeX: [''],
      gridSizeY: [''],
    });
  }
}
