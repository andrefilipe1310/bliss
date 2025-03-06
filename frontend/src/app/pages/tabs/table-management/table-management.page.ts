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
import { Guest, Table, TableGuest } from 'src/app/models/pages-interfaces.model';
import tableGuestsExamples from '../../../models/tableGuestsExamples.json'

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

  allTables:Table[] = []

  allGuests = tableGuestsExamples as TableGuest[]

  newTable:Table = {
    id:'',
    name:'',
    selectedGuests:[]
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

  addNewTableGuest = (g:TableGuest) =>{
    const findGuest = this.newTable.selectedGuests.find(guest => g.id === guest.id)
    if (findGuest){
      console.log('aready added')
    }else{
      this.newTable.selectedGuests.push(g)
      console.log('added')
    }
  }
  
}
