import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeddingInformationPageRoutingModule } from './wedding-information-routing.module';

import { WeddingInformationPage } from './wedding-information.page';
import { DateInputModule } from "../../components/date-input/date-input.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeddingInformationPageRoutingModule,
    DateInputModule
],
  declarations: [WeddingInformationPage]
})
export class WeddingInformationPageModule {}
