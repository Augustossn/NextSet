import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // Adicionado ActivatedRoute
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-new-workout',
  standalone: false,
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {

  workoutForm: FormGroup;
  isSaving = false;
  isEditMode = false; // Controle para saber se estamos editando
  workoutId: number | null = null; // ID do treino sendo editado

  daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute // Para ler o ID da URL
  ) {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      dayOfWeek: ['Segunda', Validators.required],
      exercises: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Verifica se tem ID na URL
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.isEditMode = true;
      this.workoutId = Number(id);
      this.loadWorkoutData(this.workoutId);
    } else {
      // Se for novo, adiciona um exercício vazio padrão
      this.addExercise();
    }
  }

  loadWorkoutData(id: number) {
    this.api.getWorkoutById(id).subscribe(data => {
      // Preenche campos básicos
      this.workoutForm.patchValue({
        name: data.name,
        dayOfWeek: data.dayOfWeek
      });

      // Preenche os exercícios (FormArray é mais chato, precisa de loop)
      if (data.exercises) {
        data.exercises.forEach(ex => {
          const exerciseGroup = this.fb.group({
            name: [ex.name, Validators.required],
            sets: this.fb.array([])
          });

          // Preenche as séries (sets) dentro do exercício
          if (ex.sets) {
            ex.sets.forEach(s => {
              (exerciseGroup.get('sets') as FormArray).push(this.fb.group({
                setNumber: [s.setNumber],
                reps: [s.reps, Validators.required],
                weight: [s.weight, Validators.required]
              }));
            });
          }

          this.exercises.push(exerciseGroup);
        });
      }
    });
  }

  // --- Getters e Helpers (Iguais ao anterior) ---
  get exercises(): FormArray {
    return this.workoutForm.get('exercises') as FormArray;
  }

  getSets(exerciseIndex: number): FormArray {
    return this.exercises.at(exerciseIndex).get('sets') as FormArray;
  }

  addExercise() {
    const exerciseGroup = this.fb.group({
      name: ['', Validators.required],
      sets: this.fb.array([])
    });
    this.exercises.push(exerciseGroup);
    this.addSet(this.exercises.length - 1);
  }

  removeExercise(index: number) {
    this.exercises.removeAt(index);
  }

  addSet(exerciseIndex: number) {
    const sets = this.getSets(exerciseIndex);
    const setGroup = this.fb.group({
      setNumber: [sets.length + 1],
      reps: [0, Validators.required],
      weight: [0, Validators.required]
    });
    sets.push(setGroup);
  }

  removeSet(exerciseIndex: number, setIndex: number) {
    this.getSets(exerciseIndex).removeAt(setIndex);
  }

  onSubmit() {
    if (this.workoutForm.invalid) return;

    this.isSaving = true;
    const workoutData = this.workoutForm.value;

    if (this.isEditMode && this.workoutId) {
      // MODO EDIÇÃO
      this.api.updateWorkout(this.workoutId, workoutData).subscribe({
        next: () => this.router.navigate(['/workouts']),
        error: (err) => {
          console.error(err);
          this.isSaving = false;
        }
      });
    } else {
      // MODO CRIAÇÃO
      this.api.createWorkout(workoutData).subscribe({
        next: () => this.router.navigate(['/workouts']),
        error: (err) => {
          console.error(err);
          this.isSaving = false;
        }
      });
    }
  }
}