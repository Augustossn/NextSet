import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyWorkoutsComponent } from './pages/my-workouts/my-workouts.component';
import { NewWorkoutComponent } from './pages/new-workout/new-workout.component';
import { WorkoutSessionComponent } from './pages/workout-session/workout-session.component';
import { PrsComponent } from './pages/prs/prs.component';
import { ProfileComponent } from './pages/profile/profile.component'; // Importe o perfil

// Guards
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [LoginGuard] 
  },
  { 
    path: '', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'workouts', 
    component: MyWorkoutsComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'new-workout', 
    component: NewWorkoutComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'edit-workout/:id', 
    component: NewWorkoutComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'session/:id', 
    component: WorkoutSessionComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'prs', 
    component: PrsComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [AuthGuard] 
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }