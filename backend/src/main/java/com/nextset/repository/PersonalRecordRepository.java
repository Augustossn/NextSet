package com.nextset.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nextset.model.PersonalRecord;

public interface PersonalRecordRepository extends JpaRepository<PersonalRecord, Long> {
    // Útil para verificar se já existe um PR para aquele exercício antes de atualizar
    PersonalRecord findByExerciseName(String exerciseName);
}
