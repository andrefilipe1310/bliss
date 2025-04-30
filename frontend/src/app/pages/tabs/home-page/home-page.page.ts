import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
//trocar pasta dos jsons, adicionar uma pasta chamada mock que vai ter esses jsons
import services from '../../../models/allServices.json'
import { Service } from 'src/app/models/pages-interfaces.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
  standalone: false,
})
export class HomePagePage implements OnInit {
/* Trocar nome dos arquivos para apenas home */

  allServices = services as Service[]                   
  filteredServices: Service[] = this.allServices.sort((a:Service, b:Service) =>  a.name.localeCompare(b.name))
  searchIsActive = false 
  /* Usar um type DispenseCatogory */
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
    const label = this.categories.find(categorie => categorie.value === value)?.label

    if (!label){
      return "sem categoria"
    }
    return label
  }

//pesquisa
  // string em minusculo
  search = (name:String)=>{
    if (name === '' || undefined){
      this.filteredServices = this.allServices.sort((a:Service, b:Service) =>  a.name.localeCompare(b.name))
    }
    // alterar any e faz uma função para ordenar dentro de uma pasta function
    this.filteredServices = services.filter(service => service.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())).sort((a:any, b:any) =>  a.name.localeCompare(b.name))
  }
// alterar any
  filter = (category:string)=>{
    this.filteredServices = this.allServices.sort((a:any, b:any) => a.name.localeCompare(b.name))
    this.filteredServices = this.filteredServices.filter(service => service.name.toLocaleLowerCase().includes(category.toLocaleLowerCase())).sort((a:any, b:any) =>  a.name.localeCompare(b.name))
  }
  // alterar any
  Clearfilter = ()=>{
    this.filteredServices = this.allServices.sort((a:any, b:any) =>  a.name.localeCompare(b.name))
  }
//ativa o input
  activeSearch = () => {
    this.searchIsActive = !this.searchIsActive;
    this.filteredServices = this.allServices.sort((a:any, b:any) => a.name.localeCompare(b.name))
  }

  formatNumber = (value: number): string => {
    return value.toLocaleString('pt-BR'); 
  };
  //Construtor sempre no topo do codigo
  constructor() { }

  ngOnInit() {
  }

}
