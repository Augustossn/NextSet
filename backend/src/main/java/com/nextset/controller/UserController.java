package com.nextset.controller;

import com.nextset.dto.UserDTO;
import com.nextset.model.User;
import com.nextset.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Método auxiliar para pegar o usuário logado via Token
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow();
    }

    // 1. Buscar dados do perfil (Nome e Email)
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMyProfile() {
        User user = getCurrentUser();
        return ResponseEntity.ok(new UserDTO(user.getName(), user.getEmail()));
    }

    // 2. Excluir conta
    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteAccount() {
        User user = getCurrentUser();
        userRepository.delete(user); // O Cascade do banco deve apagar os treinos também
        return ResponseEntity.noContent().build();
    }
}
