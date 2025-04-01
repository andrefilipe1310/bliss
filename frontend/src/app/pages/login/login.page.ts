import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models/auth.type';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  user: User = {
    email: "",
    password: ""
  };
  private messageAlert: string = "";
  async showToast(message: string, color?: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color || 'danger',
      icon: 'warning'
    });

    await toast.present();
  }

  getAlert() {
    return this.messageAlert
  }
  // Setter para alert, que chama o Toast automaticamente
  setAlert(value: string, color?: string) {
    if (!value) {
      return
    }
    if (color) {
      this.showToast(value, color);
      return
    }
    this.messageAlert = value;
    this.showToast(value);
  }

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) { }

  ngOnInit() { }

  login():boolean {
    // Validação de campos vazios
    if (this.user.email.trim() === "" || this.user.password.trim() === "") {
      this.setAlert("Preencha todos os campos");
      return false;
    }

    // Correção da validação de e-mail
    if (!(/\S+@\S+\.\S+/.test(this.user.email))) {
      this.setAlert("E-mail não é válido");
      return false;
    }

    this.authService.login(this.user).subscribe(
      (token) => {
        localStorage.setItem("token", token);
        this.router.navigate(["/tabs"]);
        this.setAlert("Login efetuado com sucesso", "success");
        return true
      },
      (error) => {
        console.error(error);
        this.setAlert("Falha na autenticação");
        
      }
    );
    return false
  }
}
