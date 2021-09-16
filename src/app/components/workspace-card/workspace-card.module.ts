import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ClickStopPropagationModule } from '../../directives/click-stop-propagation/click-stop-propagation.module';
import { WorkspaceCardComponent } from './workspace-card.component';

@NgModule({
  declarations: [WorkspaceCardComponent],
  exports: [WorkspaceCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ClickStopPropagationModule,
  ],
})
export class WorkspaceCardModule {}
