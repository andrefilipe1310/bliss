import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BugetManagementPageRoutingModule } from './buget-management-routing.module';

import { BugetManagementPage } from './buget-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BugetManagementPageRoutingModule
  ],
  declarations: [BugetManagementPage]
})
export class BugetManagementPageModule {}
