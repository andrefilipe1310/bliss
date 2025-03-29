import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeddingInformationPage } from './wedding-information.page';

const routes: Routes = [
  {
    path: '',
    component: WeddingInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeddingInformationPageRoutingModule {}
