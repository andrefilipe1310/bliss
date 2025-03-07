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
import { Guest, Table, TableGuest } from 'src/app/models/pages-interfaces.model';
import tableGuestsExamples from '../../../models/tableGuestsExamples.json'
import type { OverlayEventDetail } from '@ionic/core';

/*
 Table {
id:string,
name:string,
selectedGuests:TableGuest[]

}*/

@Component({
  selector: 'app-table-management',
  templateUrl: './table-management.page.html',
  styleUrls: ['./table-management.page.scss'],
  standalone: false
})
export class TableManagementPage implements OnInit {
  constructor() { }

  ngOnInit() {
    console.log()
   }

  allTables:Table[] = [
    {
      id:"t01",
      name:"testTable",
      selectedGuests:[]
    }
  ]

  allGuests = tableGuestsExamples as TableGuest[]

  newTable:Table = {
    id:'',
    name:'',
    selectedGuests:[]
  }
  antTableNameData:string =""
  andTableGuestsData:TableGuest[] =[]


  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(event: CustomEvent<OverlayEventDetail>, t:Table) {
    if (event.detail.role === 'confirm'){
      this.allTables = this.allTables.filter(table=>table.id !== t.id) 
      this.deleteTable()
      console.log(`Dismissed with role: ${event.detail.role}`);
    }else{
      console.log(`Dismissed with role: ${event.detail.role}`);
    }
    
  }



  saveNewGuest = () =>{
    this.newTable.id = 'g'+ ((Math.floor(Math.random()*(1000-1)+1)).toString()).toString();

    if(this.newTable.name !== ''){
      this.allTables.push(this.newTable)
      this.newTable = {
        id:'',
        name:'',
        selectedGuests:[]
      }
    }else{
      console.log('need name to save')
    }
  }

  saveAntData= (t:Table) =>{
    this.antTableNameData = t.name
    this.andTableGuestsData = [...t.selectedGuests]
    console.log(this.andTableGuestsData)
  }

  addNewTableGuest = (g:TableGuest,t:Table) =>{
    const findGuest = t.selectedGuests.find(guest => g.id === guest.id)
    if (findGuest){
      console.log('aready added')
    }else{
      t.selectedGuests.push(g)
      console.log(this.andTableGuestsData)
      console.log('added')
    }
  }
  
  changeStyleGuestButton = (g:TableGuest,t:Table) => {
    const findGuest = t.selectedGuests.find(guest => g.id === guest.id)
    if (findGuest){
      return "aready-added-button"
    }else{
      return ""
    }
  }

  deleteGuestOnTable=(g:TableGuest,t:Table)=>{
    const changedTable = t.selectedGuests.filter(guest=> guest.id !== g.id)
    t.selectedGuests = changedTable
  }

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

  //LOGICA DO BACK DE SALVAR AS ALTERAÇÕES NO BANCO AQUI
  saveTable = (modal:IonModal) =>{
    modal.dismiss();
  }
  exitTable = (modal:IonModal,t:Table) =>{
    t.name = this.antTableNameData
    t.selectedGuests = this.andTableGuestsData
    this.antTableNameData =""
    this.andTableGuestsData = []
    modal.dismiss();
  }
  deleteTable = () =>{
    console.log('Aqui é a logica de deletar a mesa no back')
  }
}
