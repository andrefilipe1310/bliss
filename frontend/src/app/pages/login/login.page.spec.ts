import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginPage } from './login.page';
import { AuthService } from 'src/app/services/auth.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Criando os "spies" para simular os serviços
    authService = jasmine.createSpyObj('AuthService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        LoginPage,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });

    component = TestBed.inject(LoginPage);
  });

  it('deve armazenar o token e navegar ao fazer login com sucesso', () => {
    // Spying diretamente no localStorage
    const localStorageSpy = spyOn(localStorage, 'setItem');

    component.user.email = 'teste@email.com';
    component.user.password = 'senha123';

    spyOn(component, 'setAlert');
    
    authService.login.and.returnValue(of('Bearer fmsjirgbsdyhigbnisnfisdfnisdufnsidufnisduf')); // Simula login bem-sucedido

    component.login();

    // Verifica se setItem foi chamado corretamente
    expect(localStorageSpy).toHaveBeenCalledWith(
      'token',
      jasmine.any(String) // Verifica que o valor é uma string
    );
    
    // Verifica se o valor começa com 'Bearer ' seguido de uma string
    const tokenValue = localStorageSpy.calls.mostRecent().args[1]; // Trocar 'arguments' por 'args'
    expect(tokenValue).toMatch(/^Bearer .+/);

    // Verifica se a navegação ocorreu corretamente
    expect(router.navigate).toHaveBeenCalledWith(['/tabs']);
    
    // Verifica se o alerta de sucesso foi mostrado
    expect(component.setAlert).toHaveBeenCalledWith("Login efetuado com sucesso", "success");
  });

  it('deve exibir erro ao falhar na autenticação', () => {
    component.user.email = 'teste@email.com';
    component.user.password = 'senha123';

    spyOn(component, 'setAlert');

    authService.login.and.returnValue(throwError(() => new Error()));

    component.login();

    expect(component.setAlert).toHaveBeenCalledWith("Falha na autenticação");
  });
});
