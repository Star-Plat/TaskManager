package com.tmanager.TaskManager.Controller;

import com.tmanager.TaskManager.Model.AuthRequest;
import com.tmanager.TaskManager.Model.AuthResponse;
import com.tmanager.TaskManager.Model.User;
import com.tmanager.TaskManager.Repository.UserRepository;
import com.tmanager.TaskManager.Service.CustomUserDetailService;
import com.tmanager.TaskManager.Service.JWTservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private  UserRepository userRepo;
    private  AuthenticationManager authenticationManager;
    private  CustomUserDetailService userDetailsService;
    private  JWTservice jwtUtil;

    @Autowired
    public AuthController(UserRepository userRepo, AuthenticationManager authenticationManager, CustomUserDetailService userDetailsService, JWTservice jwtUtil) {
        this.userRepo = userRepo;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());
        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setRole("USER");
        userRepo.save(user);
        return ResponseEntity.ok("User registered");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication auth) {
        return ResponseEntity.ok(auth.getName());
    }

}
