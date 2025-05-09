import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-wedding-information',
  templateUrl: './wedding-information.page.html',
  styleUrls: ['./wedding-information.page.scss'],
  standalone: false
})
export class WeddingInformationPage implements OnInit {
  // Objeto unificado com todas as informações do formulário
  weddingInfo = {
    name: '',
    partnerName: '',
    userType: '',
    partnerType: '',
    weddingDate: '',
    guests: '',
    budget: '',
    selectedSuppliers: [] as string[],
  };

  lastValidBudget = 'R$ 0,00';
  formError = false;
  minDate: string = '';

  suppliersList: string[] = [
    'Recepção', 'Cerimonialista', 'Convites', 'Foto e Vídeo', 'Buffet e Gastronomia',
    'Decoração', 'Noiva e Acessórios', 'Confeitaria', 'Noivo e Acessórios',
    'Lua de Mel', 'Música', 'Beleza e Saúde', 'Joalheria', 'Animação',
    'Celebrante', 'Outros', 'Lembranças'
  ];

  ngOnInit() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // bloqueia datas passadas
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  onBudgetInput(event: any) {
    const input = event.target as HTMLInputElement;
    let rawValue = input.value.replace(/\D/g, '');

    const MAX_CENTS = 1000000000;
    if (rawValue.length > 11) {
      rawValue = rawValue.slice(0, 11);
    }

    const numericValue = parseInt(rawValue, 10) || 0;
    if (numericValue > MAX_CENTS) {
      input.value = this.lastValidBudget;
      setTimeout(() => input.setSelectionRange(this.lastValidBudget.length, this.lastValidBudget.length));
      return;
    }

    const formatted = this.formatCurrency(numericValue / 100);
    this.lastValidBudget = formatted;
    this.weddingInfo.budget = formatted;
    input.value = formatted;
  }

  blockGuestsInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
  
    // Remove tudo que não for dígito (0-9)
    value = value.replace(/[^0-9]/g, '').slice(0, 4);
  
    // Limita a 1000
    const numericValue = parseInt(value || '0', 10);
    if (numericValue > 1000) {
      value = '1000';
    }
  
    input.value = value;
    this.weddingInfo.guests = value;
  }
  

  toggleSupplierSelection(supplier: string, isChecked: boolean) {
    const list = this.weddingInfo.selectedSuppliers;
    if (isChecked) {
      if (!list.includes(supplier)) list.push(supplier);
    } else {
      this.weddingInfo.selectedSuppliers = list.filter(item => item !== supplier);
    }
  }

  submitForm() {
    const {
      name, partnerName, userType, partnerType,
      weddingDate, guests, budget
    } = this.weddingInfo;

    if (!name || !partnerName || !userType || !partnerType || !weddingDate || !guests || !budget) {
      this.formError = true;
      return;
    }

    this.formError = false;
    console.log('Formulário enviado com sucesso:', this.weddingInfo);
  }
}
