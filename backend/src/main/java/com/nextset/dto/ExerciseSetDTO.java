package com.nextset.dto;

public class ExerciseSetDTO {
    private Long id;
    private Integer setNumber;
    private Integer reps;
    private Double weight;
    private boolean completed;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Integer getSetNumber() { return setNumber; }
    public void setSetNumber(Integer setNumber) { this.setNumber = setNumber; }
    
    public Integer getReps() { return reps; }
    public void setReps(Integer reps) { this.reps = reps; }
    
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}