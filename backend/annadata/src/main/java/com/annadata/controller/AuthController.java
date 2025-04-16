package com.annadata.controller;

import com.annadata.dto.RegisterRequestDTO;
import com.annadata.entity.Login;
import com.annadata.entity.User;
import com.annadata.service.AuthService;
import com.annadata.serviceImpl.AuthServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Login loginRequest, HttpServletRequest request) {
        try{
            boolean isAuthenticated = service.authenticateUser(loginRequest);
            if (isAuthenticated) {
                createSessionWithSecurityContext(request, loginRequest.getEmail());
                return new ResponseEntity<>("Login Successful", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
            }
        }catch (IllegalArgumentException exception){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
        }

    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO request, HttpServletRequest requestContext) {
        try {
            if (service.userExists(request.getEmail()) != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
            }

            User user = service.registerUser(request);
            createSessionWithSecurityContext(requestContext, user.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
        return ResponseEntity.status(HttpStatus.OK).body("Logged out successfully");
    }

    private void createSessionWithSecurityContext(HttpServletRequest request, String email) {
        Authentication auth = new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
        SecurityContextHolder.getContext().setAuthentication(auth);

        HttpSession session = request.getSession(true);
        session.setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                SecurityContextHolder.getContext()
        );
    }
}
