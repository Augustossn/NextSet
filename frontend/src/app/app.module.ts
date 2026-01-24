import { NgModule, LOCALE_ID } from '@angular/core'; // Adicione LOCALE_ID
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// --- Imports de Locale (Datas em Português) ---
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt); // Registra o português
// ---------------------------------------------

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyWorkoutsComponent } from './pages/my-workouts/my-workouts.component';
import { NewWorkoutComponent } from './pages/new-workout/new-workout.component';
import { PrsComponent } from './pages/prs/prs.component';
import { WorkoutSessionComponent } from './pages/workout-session/workout-session.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MyWorkoutsComponent,
    NewWorkoutComponent,
    PrsComponent,
    WorkoutSessionComponent,
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    // Diz para o Angular usar PT-BR como padrão em tudo
    { provide: LOCALE_ID, useValue: 'pt-BR' } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }