import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Workout } from '../../models/models';

@Component({
  selector: 'app-my-workouts',
  standalone: false, // Importante para não dar erro
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css']
})
export class MyWorkoutsComponent implements OnInit {

  workouts: Workout[] = [];
  loading = true;
  filter: 'all' | 'day' = 'all'; // Controle da aba selecionada

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.loading = true;
    this.api.getWorkouts().subscribe({
      next: (data) => {
        this.workouts = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar treinos', err);
        this.loading = false;
      }
    });
  }

  // Apenas para trocar a cor do botão de filtro visualmente
  setFilter(type: 'all' | 'day') {
    this.filter = type;
  }
}