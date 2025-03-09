import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
  IonSelect, 
  IonSelectOption,
  IonAlert
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';
import { Guest, PersonType } from 'src/app/models/pages-interfaces.model';
import data from '../../../models/testData.json'
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
        return 'Pai do noivo'
        break;
        default:
        return 'Escolha um tipo de convidado';
        break;
    }
   }

   brideGuests:Guest[] = this.jsonData.filter((d)=> d.bog === 'bride')
   groomGuests:Guest[] = this.jsonData.filter((d)=> d.bog === 'groom')
   newGuestData:Guest = {
    id:"",
    name:"",
    type: "guest",
    email:"",
    phone: null,
    bog:'bride'
   }
   oldGuestDataType:PersonType = "guest"
   errorMessageEmail:string = ''
   errorMessageName:string =''
   errorMessagePhone:string = ''
   


   
  

   saveOldDataGuestType = (g:Guest) =>{
     this.oldGuestDataType = g.type
   }
   cancelModalGuest = (g:Guest,m:IonModal)=>{
    g.type = this.oldGuestDataType
    this.oldGuestDataType = 'guest'
    m.dismiss()
   }
   //LOGICA DE SALVAR OS DADOS NO BACK AQUI
   saveGuestData = (g:Guest,m:IonModal) =>{
    m.dismiss()
   }
   deleteGuest =() =>{
    console.log('logica do back aqui')
   }

   validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.newGuestData.email) {
      return false
    } else if (!emailRegex.test(this.newGuestData.email)) {
      return false
    } else {
      return true
    }
  }

  addNewGuestBride= (m:IonModal) =>{
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
      this.newGuestData.bog = 'bride';
  
      // Adiciona o novo convidado à lista
      this.brideGuests.push(this.newGuestData);
  
      // Reseta o objeto newGuestData
      this.newGuestData = {
        id: "",
        name: "",
        type: "guest",
        email: "",
        phone: null,
        bog: 'bride'
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

   addNewGuestGroom= (m:IonModal) =>{
    
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
      this.newGuestData.bog = 'groom';
  
      // Adiciona o novo convidado à lista
      this.groomGuests.push(this.newGuestData);
  
      // Reseta o objeto newGuestData
      this.newGuestData = {
        id: "",
        name: "",
        type: "guest",
        email: "",
        phone: null,
        bog: 'bride'
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

  closeModalNewGuest = (m:IonModal)=>{
    this.newGuestData = {
      id:"",
      name:"",
      type: "guest",
      email:"",
      phone: null,
      bog:'bride'
     }
     this.errorMessageEmail = ''
     this.errorMessageName = ''
     this.errorMessagePhone = ''
    m.dismiss();
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
  setResult(event: CustomEvent<OverlayEventDetail>, g:Guest) {
      if (event.detail.role === 'confirm'){
        if(g.bog === 'bride'){
          this.brideGuests = this.brideGuests.filter(guest=>guest.id !== g.id) 
          this.deleteGuest()
          console.log(`Dismissed with role: ${event.detail.role}`);
        }else if(g.bog === 'groom' ) {
          this.groomGuests = this.groomGuests.filter(guest=>guest.id !== g.id) 
          this.deleteGuest()
          console.log(`Dismissed with role: ${event.detail.role}`);
        }
        
      }else{
        console.log(`Dismissed with role: ${event.detail.role}`);
      }
      
    }

}
