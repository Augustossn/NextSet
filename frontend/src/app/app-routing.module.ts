import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Seus componentes (Se ainda não criou, o VS Code vai reclamar.
// Ignore por enquanto ou comente essas linhas)
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyWorkoutsComponent } from './pages/my-workouts/my-workouts.component';
import { NewWorkoutComponent } from './pages/new-workout/new-workout.component';
import { PrsComponent } from './pages/prs/prs.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },           // Home vai para Dashboard
  { path: 'workouts', component: MyWorkoutsComponent },  // Lista de Treinos
  { path: 'new-workout', component: NewWorkoutComponent }, // Criar Treino
  { path: 'prs', component: PrsComponent },              // Recordes
  { path: '**', redirectTo: '' }                         // Qualquer erro volta pra Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }