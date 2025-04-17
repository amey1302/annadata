package com.annadata.controller;
import com.annadata.entity.Login;
import com.annadata.entity.User;
import com.annadata.repository.UserRepository;
import com.annadata.service.UserService;

import com.annadata.dto.RegisterRequestDTO;
import com.annadata.entity.Login;
import com.annadata.entity.User;
import com.annadata.repository.UserRepository;
import com.annadata.service.AuthService;
import com.annadata.service.UserService;
import com.annadata.serviceImpl.AuthServiceImpl;
import com.annadata.valueobject.Role;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private UserRepository repo;

    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> login(@RequestBody Login loginRequest, HttpServletRequest request) {
        Map<String, Object> resp = new HashMap<>();

        try {
            boolean isAuthenticated = service.authenticateUser(loginRequest);
            if (isAuthenticated) {
                User user = repo.findByEmail(loginRequest.getEmail());
                createSessionWithSecurityContext(request, loginRequest.getEmail(), user.getId(), user.getRole());
                resp.put("message", "Login Success");
                resp.put("status", true);
                return new ResponseEntity<>(resp, HttpStatus.OK);
            } else {
                resp.put("message", "Invalid credential");
                resp.put("status", false);
                return new ResponseEntity<>(resp, HttpStatus.UNAUTHORIZED);
            }
        } catch (IllegalArgumentException exception) {
            resp.put("message", exception.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequestDTO request, HttpServletRequest requestContext) {
        try {
            if (service.userExists(request.getEmail()) != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
            }

            User user = service.registerUser(request);
            createSessionWithSecurityContext(requestContext, user.getEmail(), user.getId(), user.getRole());
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

    private void createSessionWithSecurityContext(HttpServletRequest request, String email, UUID id, Role role) {
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));
        Authentication auth = new UsernamePasswordAuthenticationToken(email, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(auth);

        HttpSession session = request.getSession(true);
        session.setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                SecurityContextHolder.getContext()
        );
        session.setAttribute(
                "UserId",
                id
        );
        session.setAttribute(
                "Role",
                role
        );
    }

}
