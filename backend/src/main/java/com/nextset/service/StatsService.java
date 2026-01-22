package com.nextset.service;

import com.nextset.dto.DashboardStatsDTO;
import com.nextset.dto.PersonalRecordDTO;
import com.nextset.model.PersonalRecord;
import com.nextset.repository.PersonalRecordRepository;
import com.nextset.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatsService {

    @Autowired
    private WorkoutRepository workoutRepository;
    
    @Autowired
    private PersonalRecordRepository prRepository;

    public DashboardStatsDTO getStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        stats.setTotalWorkouts(workoutRepository.count());
        
        // Lógica simplificada: contar total de exercícios somando o tamanho das listas
        // (Em um cenário real, um count query customizado seria mais performático)
        long totalExercises = workoutRepository.findAll().stream()
                .mapToLong(w -> w.getExercises().size())
                .sum();
                
        stats.setTotalExercises(totalExercises);
        stats.setTotalPRs(prRepository.count());
        
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
}