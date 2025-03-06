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
      {
        id: '2',
        name: 'Aluguel do Salão de Festas',
        category: 'localRent',
        value: 3000,
        service: {
          id: 's2',
          name: 'Salão Espaço Elegante',
          value: 3000,
          category: 'localRent',
          email: 'contato@espacoelegante.com',
        },
      },
      {
        id: '3',
        name: 'Decoração com flores naturais',
        category: 'decoration',
        value: 2500,
        service: {
          id: 's3',
          name: 'Flores e Cores Decor',
          value: 2500,
          category: 'decoration',
          email: 'contato@floresecores.com',
          phone: 11912345678,
        },
      },
      {
        id: '4',
        name: 'Bolo de Casamento',
        category: 'cake',
        value: 1200,
        service: {
          id: 's4',
          name: 'Confeitaria Doce Amor',
          value: 1200,
          category: 'cake',
          email: 'contato@doceamor.com',
        },
      },
      {
        id: '5',
        name: 'Lembrancinhas para convidados',
        category: 'gifts',
        value: 800,
        service: {
          id: 's5',
          name: 'Lembranças Personalizadas',
          value: 800,
          category: 'gifts',
          email: 'contato@lembrancaspersonalizadas.com',
        },
      },
      {
        id: '6',
        name: 'Vestido de Noiva',
        category: 'clothing',
        value: 4000,
        service: {
          id: 's6',
          name: 'Ateliê da Noiva',
          value: 4000,
          category: 'clothing',
          email: 'contato@ateliedanoiva.com',
          phone: 11987651234,
        },
      },
      {
        id: '7',
        name: 'Filmagem do Casamento',
        category: 'filmMaking',
        value: 3500,
        service: {
          id: 's7',
          name: 'CineCasamentos',
          value: 3500,
          category: 'filmMaking',
          email: 'contato@cinecasamentos.com',
        },
      },
      {
        id: '8',
        name: 'Maquiagem e Cabelo',
        category: 'brideBeauty',
        value: 600,
        service: {
          id: 's8',
          name: 'Beleza Pura',
          value: 600,
          category: 'brideBeauty',
          email: 'contato@belezapura.com',
          phone: 11912348765,
        },
      },
      {
        id: '9',
        name: 'Lua de Mel em Cancún',
        category: 'honeyMoon',
        value: 10000,
        service: {
          id: 's9',
          name: 'Viagens dos Sonhos',
          value: 10000,
          category: 'honeyMoon',
          email: 'contato@viagensdossonhos.com',
        },
      },
      {
        id: '10',
        name: 'Despesa sem serviço associado',
        category: 'gifts',
        value: 500,
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
