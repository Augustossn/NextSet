import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <--- Importe ChangeDetectorRef
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Workout } from '../../models/models';
import { finalize } from 'rxjs/operators'; // <--- Importe finalize

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
    private cdr: ChangeDetectorRef // <--- Injete o Detector
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
          // 🔥 MÁGICA: Força o Angular a perceber que o carregamento acabou
          this.cdr.detectChanges(); 
        })
      )
      .subscribe({
        next: (data) => {
          console.log('Dados do treino:', data);
          this.workout = data;
        },
        error: (err) => {
          console.error('Erro crítico no carregamento:', err);
          // O finalize vai tirar o spinner, mas o alert avisa o usuário
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

    if (confirm('Finalizar treino e salvar estas cargas como nova meta?')) {
      this.api.updateWorkout(this.workout.id, this.workout).subscribe({
        next: () => {
          alert('Treino concluído e cargas atualizadas!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erro ao atualizar:', err);
          this.router.navigate(['/']);
        }
      });
    }
  }
}