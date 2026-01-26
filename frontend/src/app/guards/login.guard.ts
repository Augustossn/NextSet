import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private api: ApiService, private router: Router) {}

  canActivate(): boolean {
    if (this.api.isLoggedIn()) {
      this.router.navigate(['/']); // Já tá logado? Vai pra Dashboard.
      return false;
    } else {
      return true; // Não tá logado? Pode ver a tela de login.
    }
  }
}