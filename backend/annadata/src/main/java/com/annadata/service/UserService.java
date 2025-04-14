package com.annadata.service;

import com.annadata.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    User createUser(User user);
    List<User> getAllUsers();
    User getUserById(UUID id);

    String deleteAllUsers();
}
