import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false,
})
export class ProfileComponent implements OnInit {

  user: any = null;
  isLoading = true;
  isDarkMode = true;

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    this.checkTheme();
  }

  loadProfile(): void {
    this.isLoading = true;

    this.api.getProfile()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          // 🔥 força o Angular a atualizar a tela
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.error('Erro ao carregar perfil', err);
        }
      });
  }

  // --- TEMA (Dark/Light) ---
  checkTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme !== 'light';
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }

  // --- AÇÕES DA CONTA ---
  logout(): void {
    this.api.logout();
    this.router.navigate(['/login']);
  }

  deleteAccount(): void {
    const confirmDelete = confirm(
      'TEM CERTEZA? Isso apagará todos os seus treinos e recordes permanentemente.'
    );

    if (confirmDelete) {
      const confirmDouble = prompt('Digite "DELETAR" para confirmar a exclusão:');

      if (confirmDouble === 'DELETAR') {
        this.api.deleteAccount().subscribe({
          next: () => {
            this.toastr.info('Sua conta foi excluída.', 'Até logo');
            this.api.logout();
            this.router.navigate(['/login']);
          },
          error: () => {
            this.toastr.error('Erro ao excluir conta. Tente novamente.', 'Erro');
          }
        });
      }
    }
  }
}
