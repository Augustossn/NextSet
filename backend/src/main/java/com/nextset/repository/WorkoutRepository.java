package com.nextset.repository;

import com.nextset.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    // Para filtrar na aba "Por Dia" (mostrado na imagem "Meus Treinos")
    List<Workout> findByDayOfWeek(String dayOfWeek);
}