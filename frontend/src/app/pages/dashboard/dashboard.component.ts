import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core'; 
import { ApiService } from '../../services/api.service';
import { DashboardStatsDTO } from '../../models/models';

declare var lucide: any;

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit { 

  currentDate: Date = new Date();
  
  stats: DashboardStatsDTO = {
    totalWorkouts: 0,
    totalExercises: 0,
    totalPRs: 0,
    todayWorkout: undefined
  };

  constructor(
    private api: ApiService,
    private cd: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    this.loadStats();
  }

  ngAfterViewInit(): void {
    this.refreshIcons();
  }

  loadStats() {
    this.api.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = { ...data };
        
        this.cd.detectChanges();

        this.refreshIcons();
      },
      error: (err) => {
        console.error('Erro no dashboard', err);
      }
    });
  }

  refreshIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}