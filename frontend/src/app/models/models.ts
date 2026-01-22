export interface ExerciseSet {
  id?: number;
  setNumber: number;
  reps: number;
  weight: number;
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

export interface DashboardStats {
  totalWorkouts: number;
  totalExercises: number;
  totalPRs: number;
}

export interface PersonalRecord {
  exerciseName: string;
  maxWeight: number;
  maxReps: number;
  dateAchieved: string;
}