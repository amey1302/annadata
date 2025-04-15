package com.annadata.service;

import com.annadata.entity.Login;

public interface AuthService {

    boolean authenticateUser(Login login);
}
