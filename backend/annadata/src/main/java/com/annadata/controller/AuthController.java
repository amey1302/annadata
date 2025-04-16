package com.annadata.controller;

import com.annadata.entity.Login;
import com.annadata.serviceImpl.AuthServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
public class AuthController {

    @Autowired
    private AuthServiceImpl service;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Login loginRequest, HttpServletRequest httpServletRequest){
        System.out.println("login called");
        System.out.println(loginRequest.getEmail() + " : " + loginRequest.getPassword());

        boolean isAuthenticated = service.authenticateUser(loginRequest);
        if(isAuthenticated){
            Authentication auth = new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), null, Collections.emptyList());
            SecurityContextHolder.getContext().setAuthentication(auth);

            HttpSession session = httpServletRequest.getSession(true);
            session.setAttribute(
                    HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    SecurityContextHolder.getContext()
            );
            System.out.println(session.getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY));

            return new ResponseEntity<>("Login Successful", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully");
    }

}
