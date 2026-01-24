import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoginMode = true; // Alterna entre Login e Registro
  isLoading = false;

  name = '';
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {
    // Se já estiver logado, joga pro Dashboard
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
      // --- LOGIN ---
      this.api.login({ email: this.email, password: this.password }).subscribe({
        next: (res) => {
          this.api.saveToken(res.token); // Salva o JWT
          this.router.navigate(['/']); // Vai pro Dashboard
        },
        error: (err) => {
          this.isLoading = false;
          alert('Login falhou! Verifique email e senha.');
        }
      });
    } else {
      // --- REGISTRO ---
      this.api.register({ name: this.name, email: this.email, password: this.password }).subscribe({
        next: (res) => {
          this.api.saveToken(res.token);
          alert('Conta criada com sucesso!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.isLoading = false;
          alert('Erro ao criar conta. Tente outro email.');
        }
      });
    }
  }
}