package com.nextset.repository;

import com.nextset.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    // Busca apenas os treinos DAQUELE usuário
    List<Workout> findAllByUserId(Long userId);
}