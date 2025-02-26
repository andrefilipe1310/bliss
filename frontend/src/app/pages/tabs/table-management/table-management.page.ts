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

@Component({
  selector: 'app-table-management',
  templateUrl: './table-management.page.html',
  styleUrls: ['./table-management.page.scss'],
  standalone: false
})
export class TableManagementPage implements OnInit {


  //* nome de variavel em inglês
  mesas: string[] = ['Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5'];
  BrideGuests: string[] = ['guest 1', 'guest 2', 'guest 2', 'guest 4', 'guest 5'];
  GroomGuests: string[] = ['guest 1', 'guest 2', 'guest 2', 'guest 4', 'guest 5'];
  tableList :string[]=[]
  //* nome de função em inglês
  adicionarPessoa (guest:string){
    this.tableList.push(guest)
  }

  constructor() { 

  }

  ngOnInit() {
  }

}
