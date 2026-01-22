package com.nextset.service;

import com.nextset.dto.*;
import com.nextset.model.*;
import com.nextset.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull; 
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
            List<Exercise> exercises = new ArrayList<>();
            for (ExerciseDTO exDto : dto.getExercises()) {
                Exercise exercise = new Exercise();
                exercise.setName(exDto.getName());
                exercise.setWorkout(workout);

                List<ExerciseSet> sets = new ArrayList<>();
                if (exDto.getSets() != null) {
                    for (ExerciseSetDTO setDto : exDto.getSets()) {
                        ExerciseSet set = new ExerciseSet();
                        set.setSetNumber(setDto.getSetNumber());
                        set.setReps(setDto.getReps());
                        set.setWeight(setDto.getWeight());
                        set.setExercise(exercise);
                        sets.add(set);
                    }
                }
                exercise.setSets(sets);
                exercises.add(exercise);
            }
            workout.setExercises(exercises);
        }

        Workout savedWorkout = workoutRepository.save(workout);
        dto.setId(savedWorkout.getId());
        return dto;
    }

    @Transactional(readOnly = true) // <--- ESSENCIAL PARA LEITURA
    public List<WorkoutDTO> getAllWorkouts() {
        return workoutRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true) // <--- ESSENCIAL PARA LEITURA
    public WorkoutDTO getWorkoutById(@NonNull Long id) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Treino não encontrado"));
        return convertToDto(workout); 
    }

    // Método Blindado de Conversão
    private WorkoutDTO convertToDto(Workout workout) {
        WorkoutDTO dto = new WorkoutDTO();
        dto.setId(workout.getId());
        dto.setName(workout.getName());
        dto.setDayOfWeek(workout.getDayOfWeek());

        List<ExerciseDTO> exerciseDTOs = new ArrayList<>();
        
        if (workout.getExercises() != null) {
            for (Exercise exercise : workout.getExercises()) {
                ExerciseDTO exDto = new ExerciseDTO();
                exDto.setName(exercise.getName());

                List<ExerciseSetDTO> setDTOs = new ArrayList<>();
                if (exercise.getSets() != null) {
                    for (ExerciseSet set : exercise.getSets()) {
                        ExerciseSetDTO setDto = new ExerciseSetDTO();
                        setDto.setSetNumber(set.getSetNumber());
                        setDto.setReps(set.getReps());
                        setDto.setWeight(set.getWeight());
                        setDTOs.add(setDto);
                    }
                }
                exDto.setSets(setDTOs);
                exerciseDTOs.add(exDto);
            }
        }
        dto.setExercises(exerciseDTOs);

        return dto;
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
        
        // Limpa e recria (Estratégia segura)
        if (workout.getExercises() != null) {
            workout.getExercises().clear();
        } else {
            workout.setExercises(new ArrayList<>());
        }

        if (dto.getExercises() != null) {
            for (ExerciseDTO exDto : dto.getExercises()) {
                Exercise exercise = new Exercise();
                exercise.setName(exDto.getName());
                exercise.setWorkout(workout);

                List<ExerciseSet> sets = new ArrayList<>();
                if (exDto.getSets() != null) {
                    for (ExerciseSetDTO setDto : exDto.getSets()) {
                        ExerciseSet set = new ExerciseSet();
                        set.setSetNumber(setDto.getSetNumber());
                        set.setReps(setDto.getReps());
                        set.setWeight(setDto.getWeight());
                        set.setExercise(exercise);
                        sets.add(set);
                    }
                }
                exercise.setSets(sets);
                workout.getExercises().add(exercise);
            }
        }

        Workout saved = workoutRepository.save(workout);
        return convertToDto(saved);
    }
}