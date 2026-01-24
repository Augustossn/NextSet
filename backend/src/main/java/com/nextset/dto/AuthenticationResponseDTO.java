package com.nextset.dto;

public class AuthenticationResponseDTO {
    private String token;
    public void AuthenticationResponse(String token) { this.token = token; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
