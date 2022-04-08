import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';

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
    MatSliderModule,
    MatMenuModule,
    FormsModule,
    ClickStopPropagationModule,
  ],
})
export class LayersPanelModule {}
