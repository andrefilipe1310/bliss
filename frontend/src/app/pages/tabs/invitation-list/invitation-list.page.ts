import { Component, OnInit } from '@angular/core';
import {
  IonModal,
} from '@ionic/angular/standalone';
import { Guest, PersonType } from 'src/app/models/pages-interfaces.model';
import data from '../../../mocks/testData.json'
import type { OverlayEventDetail } from '@ionic/core';


@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.page.html',
  styleUrls: ['./invitation-list.page.scss'],
  standalone: false,
})


export class InvitationListPage implements OnInit {
  constructor() { }
  ngOnInit() { }

  jsonData = data as Guest[];

  translateData = (t:String) => {
    switch(t){
      case 'guest':
      return 'Convidado'
      break;
      case 'bestMan':
      return 'Padrinho'
      break;
      case 'brideMaid':
      return 'Madrinha'
      break;
      case 'brideMother':
      return 'Mãe da noiva'
      break;
      case 'brideFather':
      return 'Pai da noiva'
      break;
      case 'groomFather':
      return 'Pai do noivo'
      break;
      case 'groomMother':
      return 'Mãe do noivo'
      break;
      default:
      return 'Escolha um tipo de convidado';
      break;
    }
  }

  brideGuests: Guest[] = this.jsonData.filter((d) => d.bog === 'bride');
  groomGuests: Guest[] = this.jsonData.filter((d) => d.bog === 'groom');
  newGuestData: Guest = {
    id: "",
    name: "",
    type: "guest",
    email: "",
    phone: null,
    bog: 'bride'
  };
  oldGuestDataType: PersonType = "guest";
  errorMessageEmail: string = '';
  errorMessageName: string = '';
  errorMessagePhone: string = '';
  isEditing: { [key: string]: boolean } = {}; // Objeto para controlar o estado de edição de cada convidado
  originalNames: { [key: string]: string } = {}; // Objeto para armazenar os nomes originais
  originalPhones: { [key: string]: string } = {};
  saveOldDataGuestType = (g: Guest) => {
    this.oldGuestDataType = g.type;
  }

  cancelModalGuest = (g: Guest, m: IonModal) => {
    g.type = this.oldGuestDataType;
    this.oldGuestDataType = 'guest';
    m.dismiss();
  }

  // LOGICA DE SALVAR OS DADOS NO BACK AQUI
  saveGuestData = (g: Guest, m: IonModal) => {
    m.dismiss();
    console.log('Dados do convidado salvos:', g);
    // Aqui você pode adicionar a lógica para salvar os dados no backend
  }

  deleteGuest = () => {
    console.log('logica do back aqui');
    // Aqui você pode adicionar a lógica para deletar o convidado no backend
  }

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.newGuestData.email) {
      return false;
    } else if (!emailRegex.test(this.newGuestData.email)) {
      return false;
    } else {
      return true;
    }
  }

  addNewGuest = (m: IonModal, guestType: 'bride' | 'groom') => {
    const isNameValid = !!this.newGuestData.name;
    const isEmailValid = this.validateEmail();
    const isPhoneValid = this.newGuestData.phone?.toString().length === 11;

    // Mensagens de erro
    this.errorMessageName = isNameValid ? '' : 'Insira um nome válido';
    this.errorMessageEmail = isEmailValid ? '' : 'Por favor, insira um email válido.';
    this.errorMessagePhone = isPhoneValid ? '' : 'Insira um número válido';

    if (isNameValid && isEmailValid && isPhoneValid) {
      // Gera um ID único
      this.newGuestData.id = 'g' + Math.floor(Math.random() * (1000 - 1) + 1).toString();

      // Define o tipo de convidado
      this.newGuestData.bog = guestType;

      // Adiciona o novo convidado à lista correta
      if (guestType === 'bride') {
        this.brideGuests.push({ ...this.newGuestData }); // Adiciona uma cópia
      } else if (guestType === 'groom') {
        this.groomGuests.push({ ...this.newGuestData }); // Adiciona uma cópia
      }

      // Reseta o objeto newGuestData
      this.newGuestData = {
        id: "",
        name: "",
        type: "guest",
        email: "",
        phone: "",
        bog: 'bride' // Defina um valor padrão, será sobrescrito ao adicionar
      };

      // Limpa as mensagens de erro
      this.errorMessageName = '';
      this.errorMessageEmail = '';
      this.errorMessagePhone = '';

      // Fecha o modal
      m.dismiss();
    } else {
      console.log('Dados inválidos ou faltando.');
    }
  }

  closeModalNewGuest = (m: IonModal) => {
    this.newGuestData = {
      id: "",
      name: "",
      type: "guest",
      email: "",
      phone: null,
      bog: 'bride'
    };
    this.errorMessageEmail = '';
    this.errorMessageName = '';
    this.errorMessagePhone = '';
    m.dismiss();
  }

  startEditName(guestId: string, currentName: string) {
    this.originalNames[guestId] = currentName;
    this.isEditing[guestId] = true;
  }

  startEditPhone (guestId: string, currentPhone: string) {
    this.originalPhones[guestId] = currentPhone;
    this.isEditing[guestId] = true;
  }

  saveEditedName(guest: Guest, guestList: Guest[]) {
    this.isEditing[guest.id] = false;
    const index = guestList.findIndex(g => g.id === guest.id);
    if (index !== -1) {
      console.log('Nome editado para:', guest.name);
    }
  }

  cancelEditName(guest: Guest) {
    this.isEditing[guest.id] = false;
    guest.name = this.originalNames[guest.id];
  }

  public alertButtons = [
    {
      text: 'Não',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Sim',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(event: CustomEvent<OverlayEventDetail>, g: Guest) {
    if (event.detail.role === 'confirm') {
      if (g.bog === 'bride') {
        this.brideGuests = this.brideGuests.filter(guest => guest.id !== g.id);
        this.deleteGuest();
        console.log(`Dismissed with role: ${event.detail.role}`);
      } else if (g.bog === 'groom') {
        this.groomGuests = this.groomGuests.filter(guest => guest.id !== g.id);
        this.deleteGuest();
        console.log(`Dismissed with role: ${event.detail.role}`);
      }
    } else {
      console.log(`Dismissed with role: ${event.detail.role}`);
    }
  }
 
}


