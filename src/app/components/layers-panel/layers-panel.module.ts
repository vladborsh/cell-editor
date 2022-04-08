import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ClickStopPropagationModule } from '../../directives/click-stop-propagation/click-stop-propagation.module';
import { LayersPanelComponent } from './layers-panel.component';

@NgModule({
  declarations: [LayersPanelComponent],
  exports: [LayersPanelComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ClickStopPropagationModule,
  ],
})
export class LayersPanelModule {}
