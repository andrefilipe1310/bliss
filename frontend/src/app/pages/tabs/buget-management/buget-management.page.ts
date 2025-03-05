import { Component, OnInit } from '@angular/core';
import services from '../../../models/allServices.json'

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

  userExpenses:Expense[] = [
    {
      id:'alou',
      name:'',
      category: 'buffet' ,
      value:1000,
    },
    {
      id:'alou',
      name:'',
      category: 'buffet' ,
      value:100,
      service:{
        id:'',
        name:'',
        link:'',
        value:5000,
        category:'buffet',
        email:'',
        phone:0
      }
    },{
      id:'alou',
      name:'',
      category: 'buffet' ,
      value:100,
      service:{
        id:'',
        name:'',
        link:'',
        value:12000,
        category:'buffet',
        email:'',
        phone:0
      }
    },
    {
      id:'alou',
      name:'',
      category: 'buffet' ,
      value:15000,
    },
    {
      id:'alou',
      name:'',
      category: 'buffet' ,
      value:15000,
    },
  ]

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
    return 100 - (this.progressPercentage); // Ajuste conforme necessário
  }
  

}
