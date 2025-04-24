import { Component, OnInit } from '@angular/core';
import services from '../../../models/allServices.json'
import { Service } from 'src/app/models/pages-interfaces.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
  standalone: false
})
export class HomePagePage implements OnInit {

  allServices = services as Service[] 
  filteredServices: Service[] = this.allServices
  searchIsActive = false 

  categories: { value: Service['category']; label: string }[] = [
    { value: 'buffet', label: 'Buffet' },
    { value: 'localRent', label: 'Aluguel de Local' },
    { value: 'decoration', label: 'Decoração' },
    { value: 'cake', label: 'Bolo' },
    { value: 'gifts', label: 'Presentes' },
    { value: 'clothing', label: 'Vestuário' },
    { value: 'filmMaking', label: 'Filmagem' },
    { value: 'brideBeauty', label: 'Beleza da Noiva' },
    { value: 'honeyMoon', label: 'Lua de Mel' }
  ];

  changeCategoryToPTBR = (value:string)=>{
    const label = this.categories.find(v => v.value === value)?.label

    if (!label){
      return "sem categoria"
    }
    return label
  }

//pesquisa
  search = (name:String)=>{
    if (name === '' || undefined){
      this.filteredServices = this.allServices
    }
    this.filteredServices = services.filter(service => service.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
  }
//ativa o input
  activeSearch = () => {
    this.searchIsActive = !this.searchIsActive;
    this.filteredServices = this.allServices
  }

  constructor() { }

  ngOnInit() {
  }

}
