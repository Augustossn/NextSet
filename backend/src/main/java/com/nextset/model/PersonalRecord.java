package com.nextset.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "personal_records")
public class PersonalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String exerciseName;
    private Double maxWeight;
    private Integer maxReps;
    private LocalDate dateAchieved;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getExerciseName() { return exerciseName; }
    public void setExerciseName(String exerciseName) { this.exerciseName = exerciseName; }

    public Double getMaxWeight() { return maxWeight; }
    public void setMaxWeight(Double maxWeight) { this.maxWeight = maxWeight; }

    public Integer getMaxReps() { return maxReps; }
    public void setMaxReps(Integer maxReps) { this.maxReps = maxReps; }
    
    public LocalDate getDateAchieved() { return dateAchieved; }
    public void setDateAchieved(LocalDate dateAchieved) { this.dateAchieved = dateAchieved; }
}