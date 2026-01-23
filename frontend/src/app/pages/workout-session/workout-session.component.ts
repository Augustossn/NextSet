import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Workout } from '../../models/models';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-workout-session',
  standalone: false,
  templateUrl: './workout-session.component.html',
  styleUrls: ['./workout-session.component.css']
})
export class WorkoutSessionComponent implements OnInit {

  workout: Workout | null = null;
  isLoading = true;
  
  // Controle visual de séries concluídas
  completedSets: Set<string> = new Set();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (id && !isNaN(id)) {
      this.loadWorkout(id);
    } else {
      this.router.navigate(['/']);
    }
  }

  loadWorkout(id: number) {
    this.isLoading = true;
    
    this.api.getWorkoutById(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); // Garante atualização da tela
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Dados do treino:', data);
          this.workout = data;
        },
        error: (err) => {
          console.error('Erro crítico no carregamento:', err);
          alert('Erro ao carregar os dados do treino. Verifique o console.');
        }
      });
  }

  toggleSet(exerciseIndex: number, setIndex: number) {
    const key = `${exerciseIndex}-${setIndex}`;
    if (this.completedSets.has(key)) {
      this.completedSets.delete(key);
    } else {
      this.completedSets.add(key);
    }
  }

  isSetCompleted(exerciseIndex: number, setIndex: number): boolean {
    return this.completedSets.has(`${exerciseIndex}-${setIndex}`);
  }

  finishSession() {
    if (!this.workout || !this.workout.id) return;

    if (confirm('Finalizar treino? Apenas séries marcadas como FEITO contarão para o PR!')) {
      
      this.isLoading = true;

      if (this.workout.exercises) {
        this.workout.exercises.forEach((exercise, i) => {
          if (exercise.sets) {
            exercise.sets.forEach((set, j) => {
              const key = `${i}-${j}`;
              set.completed = this.completedSets.has(key);
            });
          }
        });
      }

      this.api.updateWorkout(this.workout.id, this.workout).subscribe({
        next: () => {
          alert('Treino finalizado com sucesso!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erro ao atualizar:', err);
          alert('Erro ao salvar o treino.');
          this.isLoading = false;
        }
      });
    }
  }
}