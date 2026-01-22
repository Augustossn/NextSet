import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms'; // <--- Importante para formulários
import { NewWorkoutComponent } from './new-workout.component';
import { ApiService } from '../../services/api.service';

describe('NewWorkoutComponent', () => {
  let component: NewWorkoutComponent;
  let fixture: ComponentFixture<NewWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWorkoutComponent ],
      imports: [ 
        HttpClientTestingModule,
        ReactiveFormsModule // <--- Necessário
      ],
      providers: [ ApiService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});