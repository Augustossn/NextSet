import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importe HttpHeaders
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

  // ==========================================================
  // AUTENTICAÇÃO (Login / Registro / Token)
  // ==========================================================

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('auth_token');
    window.location.reload();
  }

  // --- HELPER: Cria o cabeçalho com o Token ---
  // Toda requisição privada precisa chamar isso agora!
  private getHeaders() {
    const token = this.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // ==========================================================
  // TREINOS (Agora com getHeaders())
  // ==========================================================

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.baseUrl}/workouts`, this.getHeaders());
  }

  createWorkout(workout: any): Observable<WorkoutDTO> {
    return this.http.post<WorkoutDTO>(`${this.baseUrl}/workouts`, workout, this.getHeaders());
  }

  getWorkoutById(id: number): Observable<WorkoutDTO> {
    return this.http.get<WorkoutDTO>(`${this.baseUrl}/workouts/${id}`, this.getHeaders());
  }

  updateWorkout(id: number, workout: any): Observable<WorkoutDTO> {
    return this.http.put<WorkoutDTO>(`${this.baseUrl}/workouts/${id}`, workout, this.getHeaders());
  }

  deleteWorkout(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/workouts/${id}`, this.getHeaders());
  }

  // ==========================================================
  // ESTATÍSTICAS E PRs (Agora com getHeaders())
  // ==========================================================

  getDashboardStats(): Observable<DashboardStatsDTO> {
    return this.http.get<DashboardStatsDTO>(`${this.baseUrl}/stats/dashboard`, this.getHeaders());
  }

  getPRs(): Observable<PersonalRecordDTO[]> {
    return this.http.get<PersonalRecordDTO[]>(`${this.baseUrl}/stats/prs`, this.getHeaders());
  }
}