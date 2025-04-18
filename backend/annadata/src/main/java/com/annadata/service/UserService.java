package com.annadata.service;

import com.annadata.dto.UserResponseDTO;
import com.annadata.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    User createUser(User user);
    List<UserResponseDTO> getAllUsers();
    User getUserById(UUID id);

    String deleteAllUsers();
}
