import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  standalone:false
})
export class DateInputComponent  implements OnInit {
  @Input() weddingInfo: any;  // Recebe weddingInfo do componente pai
  @Input() minDate: string = '';

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  selectedDate: string = '';

validateDate(event: any) {
  const dateStr = event.target.value;
  
  if (!dateStr) return;
  
  
  const year = parseInt(dateStr.substring(0, 4), 10);
  
  if (year > 2757) { 
    this.selectedDate = '';
    this.showAlert('Ano inválido', 'Por favor, selecione um ano com até 4 dígitos');
    return;
  }
  this.weddingInfo.weddingDate = event.target.value;
  this.selectedDate = dateStr;
}

private async showAlert(header: string, message: string) {
  const alert = await this.alertController.create({
    header,
    message,
    buttons: ['OK']
  });
  await alert.present();
}
}
