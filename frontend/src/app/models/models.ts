export interface ExerciseSet {
  id?: number;
  setNumber: number;
  reps: number;
  weight: number;
  completed?: boolean;
}

export interface Exercise {
  id?: number;
  name: string;
  sets: ExerciseSet[];
}

export interface Workout {
  id?: number;
  name: string;
  dayOfWeek: string;
  exercises: Exercise[];
}

// Alias para o TypeScript aceitar "WorkoutDTO" como se fosse "Workout"
export interface WorkoutDTO extends Workout {}

export interface DashboardStats {
  totalWorkouts: number;
  totalExercises: number;
  totalPRs: number;
  todayWorkout?: Workout; // <--- ADICIONADO: O Backend agora manda isso!
}

// Alias para o TypeScript aceitar "DashboardStatsDTO"
export interface DashboardStatsDTO extends DashboardStats {}

export interface PersonalRecord {
  exerciseName: string;
  maxWeight: number;
  maxReps: number;
  dateAchieved: string;
}

// Alias para o TypeScript aceitar "PersonalRecordDTO"
export interface PersonalRecordDTO extends PersonalRecord {}