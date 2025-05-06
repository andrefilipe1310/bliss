
import { Component } from '@angular/core';
import { Guest } from "src/app/models/pages-interfaces.model";
import data from '../../../mocks/testData.json'


@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.page.html',
  styleUrls: ['./invitation-list.page.scss'],
  standalone: false
})
export class InvitationListPage {
  
  isBrideModalOpen = false;
  isGroomModalOpen = false;
  jsonData = data as Guest[];
  brideGuests: Guest[] = this.jsonData.filter((d) => d.bog === 'bride');
  groomGuests: Guest[] = this.jsonData.filter((d) => d.bog === 'groom');

  openModal(type: 'bride' | 'groom') {
    if (type === 'bride') {
      this.isBrideModalOpen = true;
    } else {
      this.isGroomModalOpen = true;
    }
  }

  onGuestAdded(newGuest: Guest) {
    if (newGuest.bog === 'bride') {
      this.brideGuests.push(newGuest);
      this.isBrideModalOpen = false;
    } else {
      this.groomGuests.push(newGuest);
      this.isGroomModalOpen = false;
    }
  }
}
