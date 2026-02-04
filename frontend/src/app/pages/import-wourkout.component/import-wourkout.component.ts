import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import {Workout} from '../../models/models';
@Component({
  selector: 'app-import-wourkout.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import-wourkout.component.html',
  styleUrl: './import-wourkout.component.css',
})
export class ImportWourkoutComponent {
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private service = inject(ApiService);

  workoutId = signal<number | null>(null);
  isLoading = signal(false);
  workoutPreview = signal<Workout | null>(null);


  ngOnInit(): void {
    // Pega o ID da URL: /importar-treino/123
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.workoutId.set(Number(id));
      this.loadPreview(Number(id));
    }
  }

  loadPreview(id: number) {
    this.service.getWorkoutById(id).subscribe({
      next: (data: Workout) => this.workoutPreview.set(data),
      error: () => console.error('Treino não encontrado')
    });
  }

  confirmImport() {
    const id = this.workoutId();
    if (!id) return;

    this.isLoading.set(true);
    console.log(id)
    this.service.cloneWorkout(id).subscribe({
      next: (newWorkout) => {
        this.isLoading.set(false);
        this.router.navigate(['/meus-treinos']);
      },
      error: (err) => {
        this.isLoading.set(false);
        alert('Erro ao importar treino. Tente novamente.');
      }
    });
  }

}
