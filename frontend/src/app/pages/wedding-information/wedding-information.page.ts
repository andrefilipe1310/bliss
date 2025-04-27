import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-wedding-information',
  templateUrl: './wedding-information.page.html',
  styleUrls: ['./wedding-information.page.scss'],
  standalone:false
})
export class WeddingInformationPage implements OnInit {

  name: string = '';
  partnerName: string = '';
  weddingDate: string = '';
  guests: number | null = null;
  budget: string = '';
  selectedSuppliers: string[] = [];
  

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  

lastValidBudget: string = 'R$ 0,00';

onBudgetInput(event: any) {
  const input = event.target as HTMLInputElement;
  let value = input.value;
  
  // 1. Remove toda formatação existente, mantendo apenas dígitos
  const rawValue = value.replace(/[^\d]/g, '');
  
  // 2. Converte para número (em centavos)
  const numericValue = parseInt(rawValue, 10) || 0;
  
  // 3. Define o valor máximo em centavos (10.000.000,00 = 1.000.000.000 centavos)
  const MAX_IN_CENTS = 1000000000;
  
  // 4. Verifica se ultrapassou o limite
  if (numericValue > MAX_IN_CENTS) {
    // 4a. Se ultrapassar, restaura o último valor válido
    input.value = this.lastValidBudget;
    // Coloca o cursor no final
    setTimeout(() => input.setSelectionRange(this.lastValidBudget.length, this.lastValidBudget.length));
    return;
  }
  
  // 5. Formata o novo valor
  const formattedValue = this.formatCurrency(numericValue / 100);
  
  // 6. Atualiza somente se for diferente
  if (formattedValue !== this.lastValidBudget) {
    this.budget = formattedValue;
    this.lastValidBudget = formattedValue;
  }
}

private formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).replace('R$', 'R$ ');
}


  blockInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove qualquer caractere que não seja número
    value = value.replace(/[^0-9]/g, '');

    // Limita o número de caracteres para no máximo 4
    if (value.length > 4) {
      value = value.substring(0, 4);
    }


    if (value) {
      const numericValue = parseInt(value, 10);
      if (numericValue > 1000) {
        // Agora trava no último valor permitido
        while (parseInt(value, 10) > 1000 && value.length > 0) {
          value = value.substring(0, value.length - 1);
        }
      }
    }

    input.value = value;
  }

}
