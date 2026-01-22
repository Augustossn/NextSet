import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-new-workout',
  standalone: false, // Obrigatório na sua configuração
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {

  workoutForm: FormGroup;
  isSaving = false;

  daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    // Inicializa o formulário principal
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      dayOfWeek: ['Segunda', Validators.required],
      exercises: this.fb.array([]) // Lista de exercícios começa vazia
    });
  }

  ngOnInit(): void {
    // Adiciona um exercício vazio logo de cara para não ficar tudo branco
    this.addExercise();
  }

  // --- Getters para facilitar o acesso no HTML ---
  get exercises(): FormArray {
    return this.workoutForm.get('exercises') as FormArray;
  }

  getSets(exerciseIndex: number): FormArray {
    return this.exercises.at(exerciseIndex).get('sets') as FormArray;
  }

  // --- Ações de Adicionar/Remover ---
  
  addExercise() {
    const exerciseGroup = this.fb.group({
      name: ['', Validators.required],
      sets: this.fb.array([])
    });
    
    this.exercises.push(exerciseGroup);
    
    // Adiciona uma série inicial automaticamente nesse novo exercício
    this.addSet(this.exercises.length - 1);
  }

  removeExercise(index: number) {
    this.exercises.removeAt(index);
  }

  addSet(exerciseIndex: number) {
    const sets = this.getSets(exerciseIndex);
    const setGroup = this.fb.group({
      setNumber: [sets.length + 1], // Auto-incremento (Visual)
      reps: [0, Validators.required],
      weight: [0, Validators.required]
    });
    sets.push(setGroup);
  }

  removeSet(exerciseIndex: number, setIndex: number) {
    this.getSets(exerciseIndex).removeAt(setIndex);
  }

  // --- Salvar ---

  onSubmit() {
    if (this.workoutForm.invalid) return;

    this.isSaving = true;
    const workoutData = this.workoutForm.value;

    this.api.createWorkout(workoutData).subscribe({
      next: () => {
        // Sucesso! Volta para a lista de treinos
        this.router.navigate(['/workouts']);
      },
      error: (err) => {
        console.error('Erro ao salvar treino', err);
        this.isSaving = false;
      }
    });
  }
}