import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

import { SaveFileDialogComponent } from './save-file-dialog.component';

@NgModule({
  declarations: [SaveFileDialogComponent],
  exports: [SaveFileDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSliderModule,
    MatCheckboxModule,
  ],
})
export class SaveFileDialogModule {}
