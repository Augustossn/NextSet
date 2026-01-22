package com.nextset.service;

import com.nextset.dto.DashboardStatsDTO;
import com.nextset.dto.PersonalRecordDTO;
import com.nextset.dto.WorkoutDTO;
import com.nextset.model.Workout;
import com.nextset.repository.PersonalRecordRepository;
import com.nextset.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StatsService {

    @Autowired
    private WorkoutRepository workoutRepository;
    
    @Autowired
    private PersonalRecordRepository prRepository;

    public DashboardStatsDTO getStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        
        // 1. Contadores
        stats.setTotalWorkouts(workoutRepository.count());
        stats.setTotalPRs(prRepository.count());
        
        long totalExercises = workoutRepository.findAll().stream()
                .mapToLong(w -> w.getExercises().size())
                .sum();
        stats.setTotalExercises(totalExercises);

        // 2. Lógica do Treino de Hoje (BLINDADA)
        String diaHoje = getDiaEmPortugues();
        
        // Busca TODOS e filtra na memória para ignorar erros de digitação (espaços/maiúsculas)
        Optional<Workout> treinoHoje = workoutRepository.findAll().stream()
            .filter(w -> w.getDayOfWeek().trim().equalsIgnoreCase(diaHoje))
            .findFirst();

        if (treinoHoje.isPresent()) {
            Workout treino = treinoHoje.get();
            WorkoutDTO treinoDto = new WorkoutDTO();
            treinoDto.setId(treino.getId());
            treinoDto.setName(treino.getName());
            treinoDto.setDayOfWeek(treino.getDayOfWeek());
            
            stats.setTodayWorkout(treinoDto);
            System.out.println("Treino encontrado para hoje: " + treino.getName()); // Log para debug
        } else {
            System.out.println("Nenhum treino encontrado para: " + diaHoje); // Log para debug
        }
        
        return stats;
    }

    public List<PersonalRecordDTO> getAllPRs() {
        return prRepository.findAll().stream().map(pr -> {
            PersonalRecordDTO dto = new PersonalRecordDTO();
            dto.setExerciseName(pr.getExerciseName());
            dto.setMaxWeight(pr.getMaxWeight());
            dto.setMaxReps(pr.getMaxReps());
            dto.setDateAchieved(pr.getDateAchieved());
            return dto;
        }).collect(Collectors.toList());
    }

    // Tradutor de Dias
    private String getDiaEmPortugues() {
        DayOfWeek dow = LocalDate.now().getDayOfWeek();
        switch (dow) {
            case MONDAY: return "Segunda";
            case TUESDAY: return "Terça";
            case WEDNESDAY: return "Quarta";
            case THURSDAY: return "Quinta";
            case FRIDAY: return "Sexta";
            case SATURDAY: return "Sábado";
            case SUNDAY: return "Domingo";
            default: return "";
        }
    }
}