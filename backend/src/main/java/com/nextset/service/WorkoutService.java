package com.nextset.service;

import com.nextset.dto.*;
import com.nextset.model.*;
import com.nextset.repository.PersonalRecordRepository;
import com.nextset.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull; 
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate; // Alterado para LocalDate
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private PersonalRecordRepository prRepository;

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

    @Transactional(readOnly = true)
    public List<WorkoutDTO> getAllWorkouts() {
        return workoutRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public WorkoutDTO getWorkoutById(@NonNull Long id) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Treino não encontrado"));
        return convertToDto(workout); 
    }

    @Transactional
    public WorkoutDTO updateWorkout(@NonNull Long id, WorkoutDTO dto) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Treino não encontrado"));

        workout.setName(dto.getName());
        workout.setDayOfWeek(dto.getDayOfWeek());
        
        // --- VERIFICAÇÃO DE PRs (Adaptado para sua classe) ---
        if (dto.getExercises() != null) {
            for (ExerciseDTO exDto : dto.getExercises()) {
                checkAndUpdatePR(exDto);
            }
        }
        // -----------------------------------------------------

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

    public void deleteWorkout(@NonNull Long id) {
        workoutRepository.deleteById(id);
    }

    // --- MÉTODO CORRIGIDO PARA USAR OS SEUS GETTERS/SETTERS ---
    private void checkAndUpdatePR(ExerciseDTO exerciseDto) {
        if (exerciseDto.getSets() == null || exerciseDto.getSets().isEmpty()) return;

        double maxWeight = 0.0;
        int maxReps = 0;

        for (ExerciseSetDTO set : exerciseDto.getSets()) {
            double currentWeight = set.getWeight() != null ? set.getWeight() : 0.0;
            int currentReps = set.getReps() != null ? set.getReps() : 0;

            if (currentWeight > maxWeight) {
                maxWeight = currentWeight;
                maxReps = currentReps;
            } else if (currentWeight == maxWeight && currentReps > maxReps) {
                maxReps = currentReps;
            }
        }

        if (maxWeight <= 0) return;

        String exerciseName = exerciseDto.getName();
        PersonalRecord pr = prRepository.findByExerciseNameIgnoreCase(exerciseName)
                .orElse(new PersonalRecord());

        boolean isNewRecord = false;

        // AQUI ESTAVAM OS ERROS: Agora usamos getMaxWeight() em vez de getWeight()
        if (pr.getMaxWeight() == null) {
            isNewRecord = true;
        } else if (maxWeight > pr.getMaxWeight()) {
            isNewRecord = true;
        } else if (maxWeight == pr.getMaxWeight() && maxReps > pr.getMaxReps()) {
            isNewRecord = true;
        }

        if (isNewRecord) {
            pr.setExerciseName(exerciseName);
            pr.setMaxWeight(maxWeight); // Ajustado
            pr.setMaxReps(maxReps);     // Ajustado
            pr.setDateAchieved(LocalDate.now()); // Ajustado para LocalDate
            
            prRepository.save(pr);
            System.out.println("NOVO PR SALVO: " + exerciseName + " - " + maxWeight + "kg");
        }
    }

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
}