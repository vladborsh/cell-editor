import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CanvasComponent } from './canvas.component';

@NgModule({
  declarations: [CanvasComponent],
  exports: [CanvasComponent],
  imports: [CommonModule],
})
export class CanvasModule {}
