import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresentsPageRoutingModule } from './presents-routing.module';

import { PresentsPage } from './presents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PresentsPageRoutingModule
  ],
  declarations: [PresentsPage]
})
export class PresentsPageModule {}
