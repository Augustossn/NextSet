import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Workout } from '../../models/models';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-my-workouts',
  standalone: false,
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css']
})
export class MyWorkoutsComponent implements OnInit {

  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  filterType: 'ALL' | 'DAY' = 'ALL';
  isLoading = true;

  // Variável para controlar qual menu está aberto (guarda o ID do treino)
  activeDropdownId: number | null = null;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts(): void {
    this.isLoading = true;

    this.api.getWorkouts()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          this.workouts = data;
          this.applyFilter();
        },
        error: (err) => {
          console.error('Erro ao carregar treinos', err);
        }
      });
  }

  setFilter(type: 'ALL' | 'DAY'): void {
    this.filterType = type;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.filterType === 'ALL') {
      this.filteredWorkouts = [...this.workouts];
    } else {
      const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const today = days[new Date().getDay()];
      this.filteredWorkouts = this.workouts.filter(
        w => w.dayOfWeek === today
      );
    }
  }

  // --- NOVA LÓGICA DO MENU ---

  // Abre ou fecha o menu específico daquele ID
  toggleDropdown(id: number | undefined, event: Event) {
    event.stopPropagation(); // Impede que o clique feche o menu imediatamente
    
    if (this.activeDropdownId === id) {
      this.activeDropdownId = null; // Se já tá aberto, fecha
    } else {
      this.activeDropdownId = id || null; // Abre o novo
    }
  }

  // Fecha o menu se clicar fora dele (UX melhor)
  @HostListener('document:click')
  closeDropdown() {
    this.activeDropdownId = null;
  }

  // --- FIM DA LÓGICA DO MENU ---

  deleteWorkout(id: number | undefined) {
    if (!id) return;

    // Fecha o menu antes de perguntar
    this.activeDropdownId = null; 

    if (confirm('Tem certeza que deseja excluir este treino?')) {
      this.api.deleteWorkout(id).subscribe({
        next: () => {
          this.workouts = this.workouts.filter(w => w.id !== id);
          this.applyFilter(); 
        },
        error: (err) => alert('Erro ao excluir treino.')
      });
    }
  }
}