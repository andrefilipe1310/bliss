import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresentsPage } from './presents.page';

const routes: Routes = [
  {
    path: '',
    component: PresentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresentsPageRoutingModule {}
