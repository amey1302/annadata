package com.annadata.service;

import com.annadata.dto.RegisterRequestDTO;
import com.annadata.entity.Login;
import com.annadata.entity.User;

public interface AuthService {

    boolean authenticateUser(Login login);

    User userExists(String email);

    User registerUser(RegisterRequestDTO request);
}
