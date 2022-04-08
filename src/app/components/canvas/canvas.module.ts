import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayersPanelModule } from '../layers-panel/layers-panel.module';
import { ToolsMenuModule } from '../tools-menu/tools-menu.module';
import { CanvasComponent } from './canvas.component';

@NgModule({
  declarations: [CanvasComponent],
  exports: [CanvasComponent],
  imports: [CommonModule, ToolsMenuModule, LayersPanelModule],
})
export class CanvasModule {}
