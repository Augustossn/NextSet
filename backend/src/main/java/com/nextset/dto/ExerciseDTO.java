package com.nextset.dto;

import java.util.List;

public class ExerciseDTO {
    private Long id;
    private String name;
    private List<ExerciseSetDTO> sets;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public List<ExerciseSetDTO> getSets() { return sets; }
    public void setSets(List<ExerciseSetDTO> sets) { this.sets = sets; }
}