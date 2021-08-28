import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ToolsMenuComponent } from './tools-menu.component';

@NgModule({
  declarations: [ToolsMenuComponent],
  exports: [ToolsMenuComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
})
export class ToolsMenuModule {}
