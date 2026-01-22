import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Workout, 
  WorkoutDTO, 
  DashboardStatsDTO, 
  PersonalRecordDTO 
} from '../models/models'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // --- Workouts ---
  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.baseUrl}/workouts`);
  }

  createWorkout(workout: any): Observable<WorkoutDTO> {
    return this.http.post<WorkoutDTO>(`${this.baseUrl}/workouts`, workout);
  }

  // --- Stats / Dashboard ---
  getDashboardStats(): Observable<DashboardStatsDTO> {
    // Garante que a URL bate com o Backend (/api/stats/dashboard)
    return this.http.get<DashboardStatsDTO>(`${this.baseUrl}/stats/dashboard`);
  }

  // --- PRs ---
  getPRs(): Observable<PersonalRecordDTO[]> {
    // Garante que a URL bate com o Backend (/api/stats/prs)
    return this.http.get<PersonalRecordDTO[]>(`${this.baseUrl}/stats/prs`);
  }
  // Buscar um treino específico
  getWorkoutById(id: number): Observable<WorkoutDTO> {
    return this.http.get<WorkoutDTO>(`${this.baseUrl}/workouts/${id}`);
  }

  // Atualizar
  updateWorkout(id: number, workout: any): Observable<WorkoutDTO> {
    return this.http.put<WorkoutDTO>(`${this.baseUrl}/workouts/${id}`, workout);
  }

  // Deletar
  deleteWorkout(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/workouts/${id}`);
  }
}