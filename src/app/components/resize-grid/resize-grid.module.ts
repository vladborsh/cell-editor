import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ResizeGridComponent } from './resize-grid.component';

@NgModule({
  declarations: [ResizeGridComponent],
  exports: [ResizeGridComponent],
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
})
export class ResizeGridModule {}
