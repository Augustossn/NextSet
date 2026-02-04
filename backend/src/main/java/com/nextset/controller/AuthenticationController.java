package com.nextset.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nextset.dto.*;
import com.nextset.model.User;
import com.nextset.repository.UserRepository;
import com.nextset.service.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // --- CONFIGURAÇÕES DO GOOGLE (Vêm do application.properties) ---
    @Value("${google.client.id}")
    private String googleClientId;

    @Value("${google.client.secret}")
    private String googleClientSecret;

    @Value("${google.redirect.uri}")
    private String googleRedirectUri;

    public AuthenticationController(AuthenticationManager authenticationManager, UserRepository userRepository,
                                    PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // --- REGISTRO COMUM (Email/Senha) ---
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> register(@RequestBody RegisterRequestDTO request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);
        return ResponseEntity.ok(new AuthenticationResponseDTO(jwtToken));
    }

    // --- LOGIN COMUM (Email/Senha) ---
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody LoginRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return ResponseEntity.ok(new AuthenticationResponseDTO(jwtToken));
    }

    // --- LOGIN COM GOOGLE (NOVO) ---
    @PostMapping("/google")
    public ResponseEntity<?> loginGoogle(@RequestBody GoogleLoginDTO request) {
        try {
            // 1. Troca o "Code" pelo "Access Token" do Google
            RestTemplate restTemplate = new RestTemplate();
            String tokenEndpoint = "https://oauth2.googleapis.com/token";

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("code", request.getCode());
            params.add("client_id", googleClientId);
            params.add("client_secret", googleClientSecret);
            params.add("redirect_uri", googleRedirectUri);
            params.add("grant_type", "authorization_code");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(tokenEndpoint, entity, String.class);

            // Ler o JSON de resposta para pegar o token
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            String accessToken = root.path("access_token").asText();

            // 2. Usa o Access Token para pegar os dados do usuário (Email e Nome)
            String userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";
            HttpHeaders authHeaders = new HttpHeaders();
            authHeaders.setBearerAuth(accessToken);
            HttpEntity<String> authEntity = new HttpEntity<>(authHeaders);

            ResponseEntity<String> userInfoResponse = restTemplate.exchange(userInfoEndpoint, HttpMethod.GET, authEntity, String.class);
            JsonNode userNode = mapper.readTree(userInfoResponse.getBody());

            String email = userNode.path("email").asText();
            String name = userNode.path("name").asText();

            // 3. Verifica se o usuário já existe no nosso banco
            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                // Se não existe, cria um novo usuário automaticamente
                user = new User();
                user.setName(name);
                user.setEmail(email);
                // Gera uma senha aleatória segura, já que ele vai logar via Google
                user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                userRepository.save(user);
            }

            // 4. Gera o NOSSO token JWT para o frontend
            String jwtToken = jwtService.generateToken(user);

            return ResponseEntity.ok(new AuthenticationResponseDTO(jwtToken));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Erro na autenticação com Google");
        }
    }
}