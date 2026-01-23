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

    // Confirmação para o usuário
    if (confirm('Finalizar treino? Se você bateu algum recorde, ele será salvo automaticamente!')) {
      
      // Ativa o loading para bloquear o botão e mostrar que está salvando
      this.isLoading = true; 

      this.api.updateWorkout(this.workout.id, this.workout).subscribe({
        next: () => {
          alert('Treino concluído! Cargas atualizadas e PRs verificados.');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erro ao atualizar:', err);
          alert('Erro ao salvar o treino.');
          this.isLoading = false; // Desbloqueia se der erro
        }
      });
    }
  }
}