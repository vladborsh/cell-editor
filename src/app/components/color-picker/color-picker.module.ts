import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'src/app/directives/click-outside/click-outside.module';

import { ColorPickerComponent } from './color-picker.component';

@NgModule({
  declarations: [ColorPickerComponent],
  exports: [ColorPickerComponent],
  imports: [CommonModule, FormsModule, ClickOutsideModule],
})
export class ColorPickerModule {}
