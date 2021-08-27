import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ResizeGridComponent } from './resize-grid.component';

@NgModule({
  declarations: [ResizeGridComponent],
  exports: [ResizeGridComponent],
  imports: [CommonModule, FormsModule],
})
export class ResizeGridModule {}
