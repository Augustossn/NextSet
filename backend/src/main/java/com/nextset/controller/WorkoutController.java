package com.nextset.controller;

import com.nextset.dto.WorkoutDTO;
import com.nextset.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull; // <--- A CORREÇÃO ESTÁ AQUI (Import do Spring)
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService;

    @PostMapping
    public ResponseEntity<WorkoutDTO> createWorkout(@RequestBody WorkoutDTO dto) {
        return ResponseEntity.ok(workoutService.createWorkout(dto));
    }

    @GetMapping
    public ResponseEntity<List<WorkoutDTO>> getAllWorkouts() {
        return ResponseEntity.ok(workoutService.getAllWorkouts());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<WorkoutDTO> getWorkout(@PathVariable @NonNull Long id) {
        return ResponseEntity.ok(workoutService.getWorkoutById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutDTO> updateWorkout(@PathVariable @NonNull Long id, @RequestBody WorkoutDTO dto) {
        return ResponseEntity.ok(workoutService.updateWorkout(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable @NonNull Long id) {
        workoutService.deleteWorkout(id);
        return ResponseEntity.noContent().build();
    }
}