import { Component, Input, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core';
import { Guest, PersonType } from 'src/app/models/pages-interfaces.model';

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-card.component.html',
  styleUrls: ['./guest-card.component.scss'],
  standalone: false
})
export class GuestCardComponent implements OnInit {

  
  @Input() guest!: Guest;
  @Input() bog!:'bride' | 'groom';
  constructor() { }

  ngOnInit() {
    
   }
  brideGuests: Guest[] = [];
  groomGuests: Guest[] = [];
  newGuestData: Guest = {
    id: "",
    name: "",
    type: "guest",
    email: "",
    phone: "",
    bog: 'bride'
  };
  oldGuestDataType: PersonType = "guest";
  isEditing: { [key: string]: boolean } = {};
  originalValue: { [key: string]: string } = {};

  public alertButtons = [
    {
      text: 'Não',
      role: 'cancel',
      handler: () => console.log('Alert canceled'),
    },
    {
      text: 'Sim',
      role: 'confirm',
      handler: () => console.log('Alert confirmed'),
    },
  ];



  translateData(type: string): string {
    const typesMap: Record<string, string> = {
      'guest': 'Convidado',
      'bestMan': 'Padrinho',
      'brideMaid': 'Madrinha',
      'brideMother': 'Mãe da noiva',
      'brideFather': 'Pai da noiva',
      'groomFather': 'Pai do noivo',
      'groomMother': 'Mãe do noivo'
    };
    return typesMap[type] || 'Escolha um tipo de convidado';
  }

  saveOldDataGuestType(guest: Guest): void {
    this.oldGuestDataType = guest.type;
  }

  cancelModalGuest(guest: Guest, modal: IonModal): void {
    guest.type = this.oldGuestDataType;
    this.oldGuestDataType = 'guest';
    modal.dismiss();
  }

  saveGuestData(guest: Guest, modal: IonModal): void {
    modal.dismiss();
    console.log('Dados do convidado salvos:', guest);
  }

  deleteGuest(): void {
    console.log('logica do back aqui');
  }

  startEditElement(guestId: string, currentValue: string): void {
    this.originalValue[guestId] = currentValue;
    this.isEditing[guestId] = true;
  }

  saveEditedElement(guest: Guest, guestList: Guest[]): void {
    this.isEditing[guest.id] = false;
    const index = guestList.findIndex(g => g.id === guest.id);
    if (index !== -1) {
      console.log('Elemento editado');
    }
  }

  cancelEditElement(guest: Guest, field: string): void {
    this.isEditing[guest.id] = false;
    if (field === "name") guest.name = this.originalValue[guest.id];
    else if (field === "phone") guest.phone = this.originalValue[guest.id];
  }

  setResult(event: CustomEvent<OverlayEventDetail>, guest: Guest): void {
    if (event.detail.role === 'confirm') {
      if (guest.bog === 'bride') {
        this.brideGuests = this.brideGuests.filter(g => g.id !== guest.id);
      } else if (guest.bog === 'groom') {
        this.groomGuests = this.groomGuests.filter(g => g.id !== guest.id);
      }
      this.deleteGuest();
    }
    console.log(`Dismissed with role: ${event.detail.role}`);
  }
}