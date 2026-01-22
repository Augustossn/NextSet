import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Seus componentes
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyWorkoutsComponent } from './pages/my-workouts/my-workouts.component';
import { NewWorkoutComponent } from './pages/new-workout/new-workout.component';
import { PrsComponent } from './pages/prs/prs.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'workouts', component: MyWorkoutsComponent },
  { path: 'new-workout', component: NewWorkoutComponent },
  { path: 'edit-workout/:id', component: NewWorkoutComponent }, // Rota de Edição OK
  { path: 'prs', component: PrsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }