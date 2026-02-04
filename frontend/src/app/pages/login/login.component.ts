import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  name = '';
  email = '';
  password = '';

  constructor(
    private api: ApiService, 
    private router: Router, 
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    if (this.api.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      const code = params['code'];
      if (code) {
        // Limpa a URL imediatamente para evitar loops se a página recarregar
        this.router.navigate([], {
          queryParams: { 'code': null },
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
        
        this.finishGoogleLogin(code);
      }
    });
  }

  loginWithGoogle() {
    this.isLoading = true;
    
    // ID do cliente (Público)
    const clientId = '853127303458-fgpgjsqjbdiijjl0n7ubmill7am7haif.apps.googleusercontent.com';
    
    // IMPORTANTE: Deve ser EXATAMENTE igual ao do application.properties (sem barra no final)
    const redirectUri = 'http://localhost:4200/login'; 
    const scope = 'email profile';
    const responseType = 'code';
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    
    window.location.href = googleAuthUrl;
  }

  finishGoogleLogin(code: string) {
    this.isLoading = true;
    
    this.api.loginGoogle(code).subscribe({
      next: (res: any) => {
        this.api.saveToken(res.token);
        this.toastr.success('Login com Google realizado!', 'Bem-vindo');
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.error('Erro Google:', err);
        this.toastr.error('Falha na autenticação.', 'Erro');
        
        // O setTimeout resolve o erro NG0100 (ExpressionChangedAfterItHasBeenCheckedError)
        // Ele joga a mudança de estado para o próximo ciclo de processamento
        setTimeout(() => {
          this.isLoading = false;
        }, 100);
      }
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.email || !this.password) return;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.api.login({ email: this.email, password: this.password }).subscribe({
        next: (res: any) => {
          this.api.saveToken(res.token); 
          this.toastr.success('Bem-vindo de volta!', 'Sucesso');
          this.router.navigate(['/']); 
        },
        error: (err: any) => {
          this.isLoading = false; // Aqui geralmente não dá erro NG0100 pois o request é mais lento
          this.toastr.error('Email ou senha incorretos.', 'Erro de Login');
        }
      });
    } else {
      this.api.register({ name: this.name, email: this.email, password: this.password }).subscribe({
        next: (res: any) => {
          this.api.saveToken(res.token);
          this.toastr.success('Conta criada com sucesso!', 'Bem-vindo');
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          this.isLoading = false;
          if (err.status === 400) {
            this.toastr.warning('Este email já está em uso.', 'Atenção');
          } else {
            this.toastr.error('Não foi possível criar a conta.', 'Erro');
          }
        }
      });
    }
  }
}