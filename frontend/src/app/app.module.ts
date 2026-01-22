import { NgModule, LOCALE_ID } from '@angular/core'; // <--- Importe LOCALE_ID
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyWorkoutsComponent } from './pages/my-workouts/my-workouts.component';
import { NewWorkoutComponent } from './pages/new-workout/new-workout.component';
import { PrsComponent } from './pages/prs/prs.component';

// --- CONFIGURAÇÃO DO PORTUGUÊS ---
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);
// ---------------------------------

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MyWorkoutsComponent,
    NewWorkoutComponent,
    PrsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' } // <--- Adicione isso
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }