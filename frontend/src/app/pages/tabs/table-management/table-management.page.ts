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
  IonSelectOption
} from '@ionic/angular/standalone';
import { Guest, Table } from 'src/app/models/pages-interfaces.model';
import data from '../../../models/tablesDataTest.json' 
import guestData from '../../../models/testData.json' 

@Component({
  selector: 'app-table-management',
  templateUrl: './table-management.page.html',
  styleUrls: ['./table-management.page.scss'],
  standalone: false
})
export class TableManagementPage implements OnInit {
  constructor() { }

  ngOnInit() { }

  jsonData = data as Table[]
  guestDataJson = guestData as Guest[]

  allTables:Table[] = this.jsonData
  

  addToTable = (g:Guest, t:Table) => {
     const idToFind = g.id
      const idToReserach = t.selectedGuests.find(guest=>guest.id===idToFind)
    if (idToReserach){
      console.log('guest aready added')
    }else{
      t.selectedGuests.push(g)
      console.log('added')
    }
  }

  removeFromTable = (g:Guest,t:Table) => {
      const newTableGuests = t.selectedGuests.filter(guest=>guest.id !== g.id)
      t.selectedGuests = newTableGuests
      console.log('removed')
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

   changeGuestButtonStyle= (g:Guest,t:Table) => {
      const idToFind = g.id
      const idToReserach = t.selectedGuests.find(guest=>guest.id===idToFind)

      if(idToReserach){
        return "taken-guest"
      }else{
        return ""
      }

   }

}
