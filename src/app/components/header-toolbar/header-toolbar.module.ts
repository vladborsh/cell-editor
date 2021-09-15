import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderToolbarComponent } from './header-toolbar.component';

@NgModule({
  declarations: [HeaderToolbarComponent],
  exports: [HeaderToolbarComponent],
  imports: [CommonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule],
})
export class HeaderToolbarModule {}
