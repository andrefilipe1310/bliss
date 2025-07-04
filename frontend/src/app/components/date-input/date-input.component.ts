import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  standalone: false,
})
export class DateInputComponent implements OnInit, OnChanges {
  @Input() weddingInfo: any; // Recebe weddingInfo do componente pai
  @Input() minDate: string = '';

  selectedDate: string = '';

  constructor() {}

  ngOnInit() {
    this.selectedDate = this.weddingInfo?.weddingDate || '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['weddingInfo'] && this.weddingInfo) {
      this.selectedDate = this.weddingInfo.weddingDate || '';
    }
  }

  updateDate(event: any) {
    const value = event.target.value;
    this.selectedDate = value;
    if (this.weddingInfo) {
      this.weddingInfo.weddingDate = value;
    }
  }
}
