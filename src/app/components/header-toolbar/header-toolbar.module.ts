import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NewWorkspaceModule } from '../new-workspace/new-workspace.module';
import { HeaderToolbarComponent } from './header-toolbar.component';

@NgModule({
  declarations: [HeaderToolbarComponent],
  exports: [HeaderToolbarComponent],
  imports: [
    CommonModule,
    NewWorkspaceModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class HeaderToolbarModule {}
