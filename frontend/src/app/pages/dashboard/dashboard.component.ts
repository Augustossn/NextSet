import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; // Ajuste o caminho se necessário
import { DashboardStats } from '../../models/models';    // Ajuste o caminho se necessário

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentDate: Date = new Date();
  
  // Objeto inicial zerado para evitar erros no HTML antes da API responder
  stats: DashboardStats = {
    totalWorkouts: 0,
    totalExercises: 0,
    totalPRs: 0
  };

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.api.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('Erro ao conectar com o backend:', err);
      }
    });
  }
}