package com.nextset.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users") // 'user' é palavra reservada no Postgres, use 'users'
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password; // A senha será criptografada

    private String name;

    // --- Métodos Obrigatórios do Spring Security ---
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(); // Por enquanto sem perfis (Admin/User), todos são iguais
    }

    @Override
    public String getPassword() { return password; }

    @Override
    public String getUsername() { return email; } // O nosso "login" é o email

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }

    // --- Getters e Setters Normais ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}