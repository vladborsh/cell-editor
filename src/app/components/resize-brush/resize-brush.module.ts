import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';

import { ClickOutsideModule } from '../../directives/click-outside/click-outside.module';
import { ResizeBrushComponent } from './resize-brush.component';

@NgModule({
  declarations: [ResizeBrushComponent],
  exports: [ResizeBrushComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class ResizeBrushModule {}
