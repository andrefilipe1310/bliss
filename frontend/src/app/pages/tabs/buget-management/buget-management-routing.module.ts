import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BugetManagementPage } from './buget-management.page';

const routes: Routes = [
  {
    path: '',
    component: BugetManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BugetManagementPageRoutingModule {}
