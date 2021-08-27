import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanvasComponent } from './components/canvas/canvas.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'canvas',
  },
  {
    path: 'canvas',
    component: CanvasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
