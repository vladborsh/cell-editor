import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NewWorkspaceComponent } from './new-workspace.component';

@NgModule({
  declarations: [NewWorkspaceComponent],
  exports: [NewWorkspaceComponent],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
})
export class NewWorkspaceModule {}
