package com.annadata.serviceImpl;

import com.annadata.dto.RegisterRequestDTO;
import com.annadata.entity.Login;
import com.annadata.entity.User;
import com.annadata.repository.UserRepository;
import com.annadata.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public boolean authenticateUser(Login loginRequest) {
        User user = userExists(loginRequest.getEmail());

        if (user == null) {
            throw new IllegalArgumentException("User does not exist");
        }

        boolean isPasswordMatch = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());

        if (!isPasswordMatch) {
            throw new IllegalArgumentException("Invalid password");
        }

        return true;
    }

    public User userExists(String email) {
        return userRepository.findByEmail(email);
    }

    public User registerUser(RegisterRequestDTO request) {
        if (request.getRole() == null || (!request.getRole().equalsIgnoreCase("DONOR") && !request.getRole().equalsIgnoreCase("RECEIVER"))) {
            throw new IllegalArgumentException("Invalid role. Must be 'DONOR' or 'RECEIVER'");
        }

        User.Role role = User.Role.valueOf(request.getRole().toUpperCase());

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .role(role)
                .build();

        return userRepository.save(user);
    }


}


