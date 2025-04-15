package com.annadata.serviceImpl;

import com.annadata.entity.Login;
import com.annadata.entity.User;
import com.annadata.repository.UserRepository;
import com.annadata.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository repo;

    @Override
    public boolean authenticateUser(Login login) {
        User user = repo.findByEmail(login.getEmail());
        return user.getPassword().equals(login.getPassword());
    }
}
