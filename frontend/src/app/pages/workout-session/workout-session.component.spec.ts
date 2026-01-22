import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Simula chamadas HTTP
import { RouterTestingModule } from '@angular/router/testing'; // Simula rotas
import { FormsModule } from '@angular/forms'; // Necessário para o [(ngModel)]

// CORREÇÃO: O nome correto da classe é WorkoutSessionComponent
import { WorkoutSessionComponent } from './workout-session.component';

describe('WorkoutSessionComponent', () => {
  let component: WorkoutSessionComponent;
  let fixture: ComponentFixture<WorkoutSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Como standalone é false, declaramos o componente aqui
      declarations: [WorkoutSessionComponent],
      // Importamos os módulos que o componente usa internamente
      imports: [
        HttpClientTestingModule, 
        RouterTestingModule,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});