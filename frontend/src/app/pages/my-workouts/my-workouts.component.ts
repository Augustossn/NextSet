import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
          // 🔥 força o Angular a atualizar a tela
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
}
