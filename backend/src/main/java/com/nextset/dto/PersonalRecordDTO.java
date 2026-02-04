package com.nextset.dto;

import java.time.LocalDate;

public class PersonalRecordDTO {
    private String exerciseName;
    private Double maxWeight;
    private Integer maxReps;
    private LocalDate dateAchieved;

    public PersonalRecordDTO() {
    }
    
    public PersonalRecordDTO(String exerciseName, Double maxWeight, Integer maxReps, LocalDate dateAchieved) {
        this.exerciseName = exerciseName;
        this.maxWeight = maxWeight;
        this.maxReps = maxReps;
        this.dateAchieved = dateAchieved;
    }

    public String getExerciseName() { return exerciseName; }
    public void setExerciseName(String exerciseName) { this.exerciseName = exerciseName; }

    public Double getMaxWeight() { return maxWeight; }
    public void setMaxWeight(Double maxWeight) { this.maxWeight = maxWeight; }

    public Integer getMaxReps() { return maxReps; }
    public void setMaxReps(Integer maxReps) { this.maxReps = maxReps; }

    public LocalDate getDateAchieved() { return dateAchieved; }
    public void setDateAchieved(LocalDate dateAchieved) { this.dateAchieved = dateAchieved; }
}