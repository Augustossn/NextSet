import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = null;
  isDarkMode = true; // Padrão é escuro

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadProfile();
    this.checkTheme();
  }

  loadProfile() {
    this.api.getProfile().subscribe({
      next: (data) => this.user = data,
      error: () => alert('Erro ao carregar perfil.')
    });
  }

  // --- TEMA (Dark/Light) ---
  checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme !== 'light'; // Se não for 'light', é dark
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }

  // --- AÇÕES DA CONTA ---
  logout() {
    this.api.logout();
    this.router.navigate(['/login']);
  }

  deleteAccount() {
    const confirmDelete = confirm('TEM CERTEZA? Isso apagará todos os seus treinos e recordes permanentemente.');
    
    if (confirmDelete) {
      const confirmDouble = prompt('Digite "DELETAR" para confirmar a exclusão:');
      
      if (confirmDouble === 'DELETAR') {
        this.api.deleteAccount().subscribe({
          next: () => {
            alert('Conta excluída. Sentiremos sua falta!');
            this.api.logout(); // Limpa token
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error(err);
            alert('Erro ao excluir conta.');
          }
        });
      }
    }
  }
}