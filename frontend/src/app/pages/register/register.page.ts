import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  formData = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: '',
  };

  constructor() {}

  ngOnInit() {}

  validateEmail(event: any) {
    const email = event.detail.value;
    const emailError = document.getElementById('email-error');

    this.formData.email = email;

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

  validatePassword(event: any) {
    const password = event.detail.value;
    const passwordError = document.getElementById('password-error');

    this.formData.password = password;

    if (!this.isValidPassword(password)) {
      event.target.classList.add('input-error');
      if (passwordError) passwordError.classList.add('visible');
    } else {
      event.target.classList.remove('input-error');
      if (passwordError) passwordError.classList.remove('visible');
    }

    // Revalida a confirmação de senha se já foi preenchida
    if (this.formData.confirmPassword) {
      this.validatePasswordsMatch();
    }
  }

  validatePasswordMatch(event: any) {
    const confirmPassword = event.detail.value;
    this.formData.confirmPassword = confirmPassword;
    this.validatePasswordsMatch();
  }

  validatePasswordsMatch() {
    const passwordMatchError = document.getElementById('password-match-error');
    const confirmPasswordInput = document.querySelector(
      '.input-confirmPassoword'
    ) as HTMLInputElement;

    if (this.formData.password !== this.formData.confirmPassword) {
      if (confirmPasswordInput)
        confirmPasswordInput.classList.add('input-error');
      if (passwordMatchError) passwordMatchError.classList.add('visible');
    } else {
      if (confirmPasswordInput)
        confirmPasswordInput.classList.remove('input-error');
      if (passwordMatchError) passwordMatchError.classList.remove('visible');
    }
  }

  isValidPassword(password: string): boolean {
    // Senha deve ter pelo menos 8 caracteres
    return password !== null && password !== undefined && password.length >= 8;
  }

  validatePhone(event: any) {
    const phone = event.detail.value;
    this.formData.phone = phone;

    // Aqui você pode adicionar validação de telefone se necessário
    // Por exemplo, verificar se tem o formato correto
  }

  validateName(event: any, field: 'name' | 'lastName') {
    const value = event.detail.value;
    this.formData[field] = value;

    // Validação simples de nome (pelo menos 2 caracteres)
    if (value && value.trim().length < 2) {
      event.target.classList.add('input-error');
    } else {
      event.target.classList.remove('input-error');
    }
  }

  submitForm() {
    if (this.validateForm()) {
      // Aqui você pode implementar a lógica de envio para o backend
      console.log('Dados do formulário:', this.formData);
      // Redirecionar para a próxima página ou mostrar sucesso
    }
  }

  validateForm(): boolean {
    let isValid = true;

    // Validar campos obrigatórios
    if (
      !this.formData.name ||
      !this.formData.lastName ||
      !this.formData.email ||
      !this.formData.phone ||
      !this.formData.country ||
      !this.formData.state ||
      !this.formData.city ||
      !this.formData.password ||
      !this.formData.confirmPassword
    ) {
      isValid = false;
    }

    // Validar email
    if (!this.isValidEmail(this.formData.email)) {
      isValid = false;
    }

    // Validar senha
    if (!this.isValidPassword(this.formData.password)) {
      isValid = false;
    }

    // Validar confirmação de senha
    if (this.formData.password !== this.formData.confirmPassword) {
      isValid = false;
    }

    return isValid;
  }
}
