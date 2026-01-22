package com.nextset.dto;

public class DashboardStatsDTO {
    private long totalWorkouts;
    private long totalExercises;
    private long totalPRs;
    
    // NOVO CAMPO: O treino do dia para o Dashboard mostrar
    private WorkoutDTO todayWorkout;

    // Getters e Setters
    public long getTotalWorkouts() { return totalWorkouts; }
    public void setTotalWorkouts(long totalWorkouts) { this.totalWorkouts = totalWorkouts; }

    public long getTotalExercises() { return totalExercises; }
    public void setTotalExercises(long totalExercises) { this.totalExercises = totalExercises; }

    public long getTotalPRs() { return totalPRs; }
    public void setTotalPRs(long totalPRs) { this.totalPRs = totalPRs; }

    public WorkoutDTO getTodayWorkout() { return todayWorkout; }
    public void setTodayWorkout(WorkoutDTO todayWorkout) { this.todayWorkout = todayWorkout; }
}