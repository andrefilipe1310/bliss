import { Component, OnInit } from '@angular/core';
import services from '../../../models/allServices.json'
import { IonicModule } from '@ionic/angular'; // Importe o IonicModule
import { IonModal } from '@ionic/angular/common';




interface UserBudget {
  id:number,
  expectedBudget:number,
  actualExpense: number,
  moneyToReach:number
}
 interface Service{
  id:string
  name:string
  link?:string
  value:number
  category:'buffet' | 'localRent' | 'decoration' | 'cake' | 'gifts' | 'clothing' | 'filmMaking' | 'brideBeauty' | 'honeyMoon' 
  email:string
  phone?:number
 }

interface Expense {
  id:string
  name:string
  category: 'buffet' | 'localRent' | 'decoration' | 'cake' | 'gifts' | 'clothing' | 'filmMaking' | 'brideBeauty' | 'honeyMoon' 
  value:number
  service?:Service
}

@Component({
  selector: 'app-buget-management',
  templateUrl: './buget-management.page.html',
  styleUrls: ['./buget-management.page.scss'],
  standalone: false
})




export class BugetManagementPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.calculateExpanses()
    this.calculateRemainder()
  }

  userBudget:UserBudget ={
    id:1,
    expectedBudget:50000,
    actualExpense: 0,
    moneyToReach: 0
  }

  allServices = services as Service[]
  

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

  userExpenses:Expense[] = [
      {
        id: '1',
        name: 'Buffet para 100 pessoas',
        category: 'buffet',
        value: 5000,
        service: {
          id: 's1',
          name: 'Buffet Delícias da Festa',
          value: 5000,
          category: 'buffet',
          email: 'contato@deliciasdafesta.com',
          phone: 11987654321,
        },
      },
  ]

  newExpense:Expense = {
    id:'',
    name:'',
    value:0,
    category:'buffet'
  } 

  isFlipped: boolean = false;

  

  calculateRemainder = () => {
    this.userBudget.moneyToReach = this.userBudget.expectedBudget - this.userBudget.actualExpense 
  }
  
  calculateExpanses = ()=>{
    this.userExpenses.map(expense=> expense.service ? this.userBudget.actualExpense+=expense.service.value : this.userBudget.actualExpense+= expense.value) 
  }
   formatNumber = (value: number): string => {
    return value.toLocaleString('pt-BR'); 
  };

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  get progressPercentage(): number {
    return (this.userBudget.actualExpense / this.userBudget.expectedBudget) * 100;
  }

  get waveAnimationDuration(): number {
    return 100 - (this.progressPercentage); 
  }
  
  addServiceToNewExpanse =(service:Service,modal:IonModal)=>{
    this.newExpense.id = service.id
    this.newExpense.service = service
    this.userExpenses.push(this.newExpense)
    this.newExpense ={
      id:'',
      name:'',
      value:0,
      category:'buffet'
    }
    modal.dismiss()
    this.calculateExpanses()
    this.calculateRemainder()
  }

}
