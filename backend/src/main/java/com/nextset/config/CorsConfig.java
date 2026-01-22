package com.nextset.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull; // Importação necessária
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) { // Adicionado @NonNull aqui
        registry.addMapping("/**") // Libera para todas as rotas
                .allowedOrigins("http://localhost:4200") // URL do Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}