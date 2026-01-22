import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DashboardStatsDTO } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentDate: Date = new Date();
  
  stats: DashboardStatsDTO = {
    totalWorkouts: 0,
    totalExercises: 0,
    totalPRs: 0,
    todayWorkout: undefined
  };

  constructor(
    private api: ApiService,
    private cd: ChangeDetectorRef // Ferramenta para atualizar a tela à força
  ) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.api.getDashboardStats().subscribe({
      next: (data) => {
        // Truque para o Angular perceber que o objeto mudou
        this.stats = { ...data };
        
        // Força a atualização do HTML agora
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erro no dashboard', err);
      }
    });
  }
}