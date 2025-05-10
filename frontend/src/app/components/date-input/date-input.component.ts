import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  standalone:false
})
export class DateInputComponent  implements OnInit {
  @Input() weddingInfo: any;  // Recebe weddingInfo do componente pai
  @Input() minDate: string = '';

  constructor() { }

selectedDate: string = '';

  ngOnInit() {
    this.selectedDate = this.weddingInfo?.weddingDate || '';
  }

 updateDate(event: any) {
    const value = event.target.value;
    this.selectedDate = value;
    this.weddingInfo.weddingDate = value;
  }
}
