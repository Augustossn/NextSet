package com.nextset.controller;

import com.nextset.dto.DashboardStatsDTO;
import com.nextset.dto.PersonalRecordDTO;
import com.nextset.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    @Autowired
    private StatsService statsService;

    // Rota explícita: /api/stats/dashboard
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        return ResponseEntity.ok(statsService.getStats());
    }

    // Rota explícita: /api/stats/prs
    @GetMapping("/prs")
    public ResponseEntity<List<PersonalRecordDTO>> getPRs() {
        return ResponseEntity.ok(statsService.getAllPRs());
    }
}