package com.tmanager.TaskManager.Model;

public class AuthResponse {

    private String token;

    @Override
    public String toString() {
        return "AuthResponse{" +
                "token='" + token + '\'' +
                '}';
    }

    public AuthResponse(String token) {
        this.token = token;
    }

    public AuthResponse() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
