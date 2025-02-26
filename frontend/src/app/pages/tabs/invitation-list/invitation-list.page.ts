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



//* interfaces e types precisam ser colocados em arquivos a parte e nomes em ingles de classe e atributos
interface Convidado {
  id: number;
  nome: string;
  tipo?: string; 
}

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.page.html',
  styleUrls: ['./invitation-list.page.scss'],
  standalone: false,
})
export class InvitationListPage implements OnInit {

  // variavel começa com minusculo
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
  // variavel começa com minusculo e não usar tipos genericos de preferencias
  GroomGuests: Object[] = [];
 
  // colocar o construtor no topo
  constructor() { }
  // Colocar no topo
  ngOnInit() {
  }

}
