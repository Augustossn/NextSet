import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Seus componentes
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyWorkoutsComponent } from './pages/my-workouts/my-workouts.component';
import { NewWorkoutComponent } from './pages/new-workout/new-workout.component';
import { WorkoutSessionComponent } from './pages/workout-session/workout-session.component';
import { PrsComponent } from './pages/prs/prs.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'workouts', component: MyWorkoutsComponent },
  { path: 'new-workout', component: NewWorkoutComponent },
  { path: 'edit-workout/:id', component: NewWorkoutComponent },
  { path: 'session/:id', component: WorkoutSessionComponent }, 
  { path: 'prs', component: PrsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }