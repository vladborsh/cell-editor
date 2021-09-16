import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WorkspaceCardListModule } from '../workspace-card-list/workspace-card-list.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [CommonModule, WorkspaceCardListModule],
})
export class HomeModule {}
