package com.nextset.dto;

import java.util.List;

public class WorkoutDTO {
    private Long id;
    private String name;
    private String dayOfWeek;
    private List<ExerciseDTO> exercises;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }
    
    public List<ExerciseDTO> getExercises() { return exercises; }
    public void setExercises(List<ExerciseDTO> exercises) { this.exercises = exercises; }
}