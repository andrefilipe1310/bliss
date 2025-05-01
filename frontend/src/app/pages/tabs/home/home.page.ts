import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import services from '../../../mocks/allServices.json'
import { Service,ExpenseCategories } from 'src/app/models/pages-interfaces.model';
import { AlphabeticaSortArray, formatNumberToR$} from 'src/app/functions/page-functions.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  allServices = services as Service[]                   
  filteredServices: Service[] = this.allServices.sort((a:Service, b:Service) =>  a.name.localeCompare(b.name))
  searchIsActive = false 
  expanseCategories = ExpenseCategories
  notificationsNumber = 2

  changeCategoryToPTBR = (value:string)=>{
    const label = this.expanseCategories.find(categorie => categorie.value === value)?.label

    if (!label){
      return "sem categoria"
    }
    return label
  }

//pesquisa
  search = (name:String)=>{
    if (name === '' || undefined){
      this.filteredServices =  AlphabeticaSortArray(this.allServices) as Service[]
    }
    this.filteredServices = AlphabeticaSortArray(services.filter(service => service.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))) as Service[]
  }
  filter = (category:String)=>{
    this.filteredServices =  AlphabeticaSortArray(this.allServices) as Service[]
    this.filteredServices = AlphabeticaSortArray(this.filteredServices.filter(service => service.name.toLocaleLowerCase().includes(category.toLocaleLowerCase()))) as Service[]
  }
  Clearfilter = ()=>{
    this.filteredServices =  AlphabeticaSortArray(this.allServices) as Service[]
  }
//ativa o input
  activeSearch = () => {
    this.searchIsActive = !this.searchIsActive;
    this.filteredServices =  AlphabeticaSortArray(this.allServices) as Service[]
  }
formatNumber =(value:number):String=>{
  const formatedNumber = formatNumberToR$(value)
  return formatedNumber
}
  
goToPresents =()=>{
  this.router.navigate(['/tabs/presents']);
}
goToServiceDetail =()=>{
  this.router.navigate(['/service-detail']);
}

maxNotificationsReach = (): Number | String =>{
  if (this.notificationsNumber > 99){
    return "99+"
  }else{
    return this.notificationsNumber
  }
}

}
