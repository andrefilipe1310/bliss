import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-wedding-information',
  templateUrl: './wedding-information.page.html',
  styleUrls: ['./wedding-information.page.scss'],
  standalone: false
})
export class WeddingInformationPage implements OnInit {

  constructor(private toastService: ToastService, private router: Router) {}


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

 // Atualiza o orçamento com bloqueio até R$ 10.000.000,00
onBudgetInput(event: any) {
  const input = event.target as HTMLInputElement;
  let rawValue = input.value.replace(/\D/g, '');

  // Limita a 9 dígitos (1000000000 centavos = 10 milhões)
 if (rawValue.length > 10) {
  rawValue = rawValue.slice(0, 10);
  this.toastService.show('O valor máximo do orçamento é de 10 milhões', 'danger');
}


  let numericValue = parseInt(rawValue || '0', 10);

  // Impede valores acima de 10 milhões
  const MAX_CENTS = 1000000000;
  if (numericValue > MAX_CENTS) {
    numericValue = MAX_CENTS;
    rawValue = numericValue.toString();
     this.toastService.show('O valor máximo do orçamento é de 10 milhões', 'danger'); 
  }

  const formatted = this.formatCurrency(numericValue / 100);
  this.lastValidBudget = formatted;
  this.weddingInfo.budget = formatted;
  input.value = formatted;

  setTimeout(() => {
    input.setSelectionRange(formatted.length, formatted.length);
  });
}

// Atualiza os convidados com limite de 1000
blockGuestsInput(event: any) {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/[^0-9]/g, '').slice(0, 4); // Apenas números
  

  // Limita o número de caracteres para no máximo 4
    if (value.length > 4) {
      value = value.substring(0, 4);
      this.toastService.show('O número máximo de convidados é 1000', 'danger');
    }


    if (value) {
      const numericValue = parseInt(value, 10);
      if (numericValue >= 1000) {
        this.toastService.show('O número máximo de convidados é 1000', 'danger');
        // Agora trava no último valor permitido
        while (parseInt(value, 10) > 1000 && value.length > 0) {
          value = value.substring(0, value.length - 1);
        }
      }
    }

    input.value = value;
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
    name,
    partnerName,
    userType,
    partnerType,
    weddingDate,
    guests,
    budget
  } = this.weddingInfo;

  // 1. Validação de campos obrigatórios
  if (!name || !partnerName || !userType || !partnerType || !weddingDate || !guests || !budget) {
    this.toastService.show('Preencha todos os campos obrigatórios.', 'warning');
    return;
  }

  // 2. Validação de data
  const selectedDate = new Date(weddingDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(selectedDate.getTime()) || selectedDate < today) {
    this.toastService.show('Escolha uma data válida a partir de hoje.', 'danger');
    return;
  }

  if (selectedDate.getFullYear() > 2757) {
    this.toastService.show('Escolha um ano com até 4 dígitos.', 'danger');
    return;
  }

  // 3. Validação do número de convidados
  const guestCount = parseInt(guests, 10);
  if (isNaN(guestCount) || guestCount <= 0) {
    this.toastService.show('Informe um número válido de convidados.', 'danger');
    return;
  }

  if (guestCount > 1000) {
    this.toastService.show('O limite de convidados é 1000.', 'danger');
    return;
  }

  // 4. Validação do orçamento
  const numericBudget = parseFloat(budget.replace(/[^\d]/g, '')) / 100;
  if (isNaN(numericBudget) || numericBudget <= 0) {
    this.toastService.show('Informe um orçamento válido.', 'danger');
    return;
  }

  if (numericBudget > 10_000_000) {
    this.toastService.show('O orçamento máximo é de 10 milhões.', 'danger');
    return;
  }

  // 5. Sucesso
  this.toastService.show('Registro feito com sucesso!', 'success');

  const json = {
    ...this.weddingInfo,
    budget: numericBudget,
    guests: guestCount
  };

  console.log('JSON enviado:', JSON.stringify(json, null, 2));

  setTimeout(() => {
    this.router.navigate(['/login']);
  }, 2000);
}
}
