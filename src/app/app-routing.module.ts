import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanvasComponent } from './components/canvas/canvas.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'workspace/:id',
    component: CanvasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
