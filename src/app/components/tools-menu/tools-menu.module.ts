import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';

import { ColorPickerModule } from '../color-picker/color-picker.module';
import { ToolsMenuComponent } from './tools-menu.component';

@NgModule({
  declarations: [ToolsMenuComponent],
  exports: [ToolsMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatSliderModule,
    ColorPickerModule,
  ],
})
export class ToolsMenuModule {}
