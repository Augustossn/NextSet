import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoginMode = true;
  isLoading = false;

  name = '';
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router, private toastr: ToastrService) {
    if (this.api.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.email || !this.password) return;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.api.login({ email: this.email, password: this.password }).subscribe({
        next: (res) => {
          this.api.saveToken(res.token); 
          this.toastr.success('Bem-vindo de volta!', 'Sucesso');
          this.router.navigate(['/']); 
        },
        error: (err) => {
          this.isLoading = false;
          this.toastr.error('Email ou senha incorretos.', 'Erro de Login');
        }
      });
    } else {
      this.api.register({ name: this.name, email: this.email, password: this.password }).subscribe({
        next: (res) => {
          this.api.saveToken(res.token);
          this.toastr.success('Conta criada com sucesso!', 'Bem-vindo');
          this.router.navigate(['/']);
        },
        error: (err) => {
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