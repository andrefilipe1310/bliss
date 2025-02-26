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

import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';

interface Convidado {
  id: number;
  nome: string;
  tipo?: string; // Opcional, caso você queira adicionar mais propriedades
}

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.page.html',
  styleUrls: ['./invitation-list.page.scss'],
  standalone: false,
})
export class InvitationListPage implements OnInit {


  BrideGuests: Convidado[] = [
    {
      id:1,
      nome:"maria lúcia",
      tipo: "mãe da noiva"
    },
    {
      id:2,
      nome:"Jéssica",
      tipo: "Convidada"
    },
    {
      id:3,
      nome:"Priscila",
      tipo: "Madrinha"
    }
  ]
  GroomGuests: Object[] = [];
 

  constructor() { }

  ngOnInit() {
  }

}
