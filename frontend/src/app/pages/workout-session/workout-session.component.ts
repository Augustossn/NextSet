import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Workout } from '../../models/models';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-workout-session',
  standalone: false, 
  templateUrl: './workout-session.component.html',
  styleUrls: ['./workout-session.component.css']
})
export class WorkoutSessionComponent implements OnInit {

  workout: Workout | null = null;
  isLoading = true;
  
  completedSets: Set<string> = new Set();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService 
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (id && !isNaN(id)) {
      this.loadWorkout(id);
    } else {
      this.toastr.error('Treino não encontrado.', 'Erro'); 
      this.router.navigate(['/']);
    }
  }

  loadWorkout(id: number) {
    this.isLoading = true;
    
    this.api.getWorkoutById(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Dados do treino:', data);
          this.workout = data;
        },
        error: (err) => {
          console.error('Erro crítico:', err);
          this.toastr.error('Não foi possível carregar o treino.', 'Erro de Conexão');
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

    if (confirm('Finalizar treino? As séries marcadas atualizarão seus Recordes (PRs)!')) {
      
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
          this.toastr.success('Treino finalizado! PRs atualizados.', 'Bom trabalho! 💪');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erro ao atualizar:', err);
          this.toastr.error('Falha ao salvar o progresso. Tente novamente.', 'Erro');
          this.isLoading = false;
        }
      });
    }
  }
}