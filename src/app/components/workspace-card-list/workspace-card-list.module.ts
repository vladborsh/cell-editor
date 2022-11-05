import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { WorkspaceCardModule } from '../workspace-card/workspace-card.module';
import { WorkspaceCardListComponent } from './workspace-card-list.component';

@NgModule({
  declarations: [WorkspaceCardListComponent],
  exports: [WorkspaceCardListComponent],
  imports: [CommonModule, WorkspaceCardModule, MatProgressSpinnerModule],
})
export class WorkspaceCardListModule {}
