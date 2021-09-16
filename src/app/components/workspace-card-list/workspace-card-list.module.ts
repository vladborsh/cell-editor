import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WorkspaceCardModule } from '../workspace-card/workspace-card.module';
import { WorkspaceCardListComponent } from './workspace-card-list.component';

@NgModule({
  declarations: [WorkspaceCardListComponent],
  exports: [WorkspaceCardListComponent],
  imports: [CommonModule, WorkspaceCardModule],
})
export class WorkspaceCardListModule {}
