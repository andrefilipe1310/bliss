import { Component, OnInit } from '@angular/core';
import { Guest } from 'src/app/models/pages-interfaces.model';
import data from '../../models/testData.json'
@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
  standalone:false
})
export class TestePage implements OnInit {
  
  constructor() { }
  jsonData = data as Guest[];
  
  guest:Guest = this.jsonData[0]

  brideGuests: Guest[] = this.jsonData.filter((d) => d.bog === 'bride');
  groomGuests: Guest[] = this.jsonData.filter((d) => d.bog === 'groom');
  ngOnInit() {

  }

}
