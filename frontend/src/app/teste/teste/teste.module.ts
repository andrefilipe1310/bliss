import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestePageRoutingModule } from './teste-routing.module';

import { TestePage } from './teste.page';
import { GuestCardModule } from 'src/app/components/guest-card/guest-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestCardModule,
    TestePageRoutingModule
  ],
  declarations: [TestePage]
})
export class TestePageModule {}
