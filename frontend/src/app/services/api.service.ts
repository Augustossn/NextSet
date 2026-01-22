import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout, DashboardStats, PersonalRecord } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Workouts
  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.baseUrl}/workouts`);
  }

  createWorkout(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(`${this.baseUrl}/workouts`, workout);
  }

  // Stats
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/stats/dashboard`);
  }

  getPRs(): Observable<PersonalRecord[]> {
    return this.http.get<PersonalRecord[]>(`${this.baseUrl}/stats/prs`);
  }
}