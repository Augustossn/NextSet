import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false,
})
export class ProfileComponent implements OnInit {

  user: any = null;
  isLoading = true; // <--- Variável de controle
  isDarkMode = true;

  constructor(private api: ApiService, private router: Router , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadProfile();
    this.checkTheme();
  }

  loadProfile() {
    this.isLoading = true; 

    this.api.getProfile().subscribe({
      next: (data) => {
        console.log('Dados recebidos do backend:', data); 
        this.user = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false; 
      }
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
            this.toastr.info('Sua conta foi excluída.', 'Até logo'); 
            this.api.logout();
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.toastr.error('Erro ao excluir conta. Tente novamente.', 'Erro');
          }
        });
      }
    }
  }
}