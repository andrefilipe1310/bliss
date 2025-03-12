import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false,
})
export class RegisterPage implements OnInit {

  constructor() {}

  ngOnInit() {}

  validateEmail(event: any) {
    const email = event.detail.value;
    const emailError = document.getElementById('email-error');
  
    if (!this.isValidEmail(email)) {
    
      event.target.classList.add('input-error');
      if (emailError) emailError.classList.add('visible');
      
    } else {
      
      event.target.classList.remove('input-error');
      if (emailError) emailError.classList.remove('visible');
    }
  }
  
  isValidEmail(email: string): boolean {
    // Expressão regular simples para validar email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
