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

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.page.html',
  styleUrls: ['./invitation-list.page.scss'],
  standalone: false,
})
export class InvitationListPage implements OnInit {

  BrideGuests: string[] = ['guest 1', 'guest 2', 'guest 2', 'guest 4', 'guest 5'];
  GroomGuests: string[] = ['guest 1', 'guest 2', 'guest 2', 'guest 4', 'guest 5'];
 

  constructor() { }

  ngOnInit() {
  }

}
