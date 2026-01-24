package com.nextset.repository;

import com.nextset.model.PersonalRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional; 

public interface PersonalRecordRepository extends JpaRepository<PersonalRecord, Long> {
    // Busca PR pelo nome E pelo dono
    Optional<PersonalRecord> findByExerciseNameIgnoreCaseAndUserId(String exerciseName, Long userId);

    // Busca todos os PRs do usuário (para a tela de lista)
    List<PersonalRecord> findAllByUserId(Long userId);
}