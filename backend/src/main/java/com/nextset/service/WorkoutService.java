package com.nextset.service;

import com.nextset.dto.*;
import com.nextset.model.*;
import com.nextset.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull; 
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Transactional
    public WorkoutDTO createWorkout(WorkoutDTO dto) {
        Workout workout = new Workout();
        workout.setName(dto.getName());
        workout.setDayOfWeek(dto.getDayOfWeek());
        workout.setCreatedAt(LocalDateTime.now());

        if (dto.getExercises() != null) {
            List<Exercise> exercises = dto.getExercises().stream().map(exDto -> {
                Exercise exercise = new Exercise();
                exercise.setName(exDto.getName());
                exercise.setWorkout(workout); 

                if (exDto.getSets() != null) {
                    List<ExerciseSet> sets = exDto.getSets().stream().map(setDto -> {
                        ExerciseSet set = new ExerciseSet();
                        set.setSetNumber(setDto.getSetNumber());
                        set.setReps(setDto.getReps());
                        set.setWeight(setDto.getWeight());
                        set.setExercise(exercise); 
                        return set;
                    }).collect(Collectors.toList());
                    exercise.setSets(sets);
                }
                return exercise;
            }).collect(Collectors.toList());
            
            workout.setExercises(exercises);
        }

        Workout savedWorkout = workoutRepository.save(workout);
        dto.setId(savedWorkout.getId());
        return dto;
    }

    public List<WorkoutDTO> getAllWorkouts() {
        return workoutRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private WorkoutDTO convertToDto(Workout workout) {
        WorkoutDTO dto = new WorkoutDTO();
        dto.setId(workout.getId());
        dto.setName(workout.getName());
        dto.setDayOfWeek(workout.getDayOfWeek());

        if (workout.getExercises() != null) {
            List<ExerciseDTO> exerciseDTOs = workout.getExercises().stream().map(exercise -> {
                ExerciseDTO exDto = new ExerciseDTO();
                exDto.setName(exercise.getName());

                if (exercise.getSets() != null) {
                    List<ExerciseSetDTO> setDTOs = exercise.getSets().stream().map(set -> {
                        ExerciseSetDTO setDto = new ExerciseSetDTO();
                        setDto.setSetNumber(set.getSetNumber());
                        setDto.setReps(set.getReps());
                        setDto.setWeight(set.getWeight());
                        return setDto;
                    }).collect(Collectors.toList());
                    exDto.setSets(setDTOs);
                }
                return exDto;
            }).collect(Collectors.toList());

            dto.setExercises(exerciseDTOs);
        }

        return dto;
    }

    public WorkoutDTO getWorkoutById(@NonNull Long id) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Treino não encontrado"));
        return convertToDto(workout); 
    }

    public void deleteWorkout(@NonNull Long id) {
        workoutRepository.deleteById(id);
    }

    @Transactional
    public WorkoutDTO updateWorkout(@NonNull Long id, WorkoutDTO dto) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Treino não encontrado"));

        workout.setName(dto.getName());
        workout.setDayOfWeek(dto.getDayOfWeek());
        
        workout.getExercises().clear(); 

        if (dto.getExercises() != null) {
            List<Exercise> newExercises = dto.getExercises().stream().map(exDto -> {
                Exercise exercise = new Exercise();
                exercise.setName(exDto.getName());
                exercise.setWorkout(workout); 

                if (exDto.getSets() != null) {
                    List<ExerciseSet> sets = exDto.getSets().stream().map(setDto -> {
                        ExerciseSet set = new ExerciseSet();
                        set.setSetNumber(setDto.getSetNumber());
                        set.setReps(setDto.getReps());
                        set.setWeight(setDto.getWeight());
                        set.setExercise(exercise); 
                        return set;
                    }).collect(Collectors.toList());
                    exercise.setSets(sets);
                }
                return exercise;
            }).collect(Collectors.toList());
            
            workout.getExercises().addAll(newExercises); 
        }

        Workout saved = workoutRepository.save(workout);
        return convertToDto(saved);
    }
}