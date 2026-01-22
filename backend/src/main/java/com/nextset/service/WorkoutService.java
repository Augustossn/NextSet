package com.nextset.service;

import com.nextset.dto.*;
import com.nextset.model.*;
import com.nextset.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Transactional // Garante que tudo salva ou nada salva (rollback em caso de erro)
    public WorkoutDTO createWorkout(WorkoutDTO dto) {
        Workout workout = new Workout();
        workout.setName(dto.getName());
        workout.setDayOfWeek(dto.getDayOfWeek());
        workout.setCreatedAt(LocalDateTime.now());

        // Convertendo DTOs para Entidades e configurando relacionamentos
        if (dto.getExercises() != null) {
            List<Exercise> exercises = dto.getExercises().stream().map(exDto -> {
                Exercise exercise = new Exercise();
                exercise.setName(exDto.getName());
                exercise.setWorkout(workout); // Vínculo Pai -> Filho

                if (exDto.getSets() != null) {
                    List<ExerciseSet> sets = exDto.getSets().stream().map(setDto -> {
                        ExerciseSet set = new ExerciseSet();
                        set.setSetNumber(setDto.getSetNumber());
                        set.setReps(setDto.getReps());
                        set.setWeight(setDto.getWeight());
                        set.setExercise(exercise); // Vínculo Filho -> Neto
                        return set;
                    }).collect(Collectors.toList());
                    exercise.setSets(sets);
                }
                return exercise;
            }).collect(Collectors.toList());
            
            workout.setExercises(exercises);
        }

        Workout savedWorkout = workoutRepository.save(workout);
        dto.setId(savedWorkout.getId()); // Retorna o ID gerado
        return dto;
    }

    public List<WorkoutDTO> getAllWorkouts() {
        return workoutRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    // Helper simples para conversão (poderia usar ModelMapper/MapStruct)
    private WorkoutDTO convertToDto(Workout workout) {
        WorkoutDTO dto = new WorkoutDTO();
        dto.setId(workout.getId());
        dto.setName(workout.getName());
        dto.setDayOfWeek(workout.getDayOfWeek());
        // Mapear exercícios e sets aqui se necessário para a listagem
        return dto;
    }
}