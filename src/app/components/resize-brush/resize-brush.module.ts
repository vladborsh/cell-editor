import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ClickOutsideModule } from '../../directives/click-outside/click-outside.module';
import { ResizeBrushComponent } from './resize-brush.component';

@NgModule({
  declarations: [ResizeBrushComponent],
  exports: [ResizeBrushComponent],
  imports: [CommonModule, FormsModule, ClickOutsideModule],
})
export class ResizeBrushModule {}
