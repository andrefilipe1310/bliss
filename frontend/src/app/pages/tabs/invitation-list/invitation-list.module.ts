import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitationListPageRoutingModule } from './invitation-list-routing.module';

import { InvitationListPage } from './invitation-list.page';
import { GuestCardModule } from 'src/app/components/guest-card/guest-card.module';
import { AddGuestModalModule } from 'src/app/components/add-guest-modal/date-input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGuestModalModule,
    GuestCardModule,
    InvitationListPageRoutingModule,
  ],
  declarations: [InvitationListPage],
  providers: []
})
export class InvitationListPageModule {}
