import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { WorkspaceCardComponent } from './workspace-card.component';

@NgModule({
  declarations: [WorkspaceCardComponent],
  exports: [WorkspaceCardComponent],
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
})
export class WorkspaceCardModule {}
