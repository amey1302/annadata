package com.annadata.serviceImpl;

import com.annadata.dto.UserResponseDTO;
import com.annadata.entity.User;
import com.annadata.repository.UserRepository;
import com.annadata.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

    }
    private UserResponseDTO mapToDTO(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .password(user.getPassword())
                .role(String.valueOf(user.getRole()))
                .build();
    }

    @Override
    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Override
    public String deleteAllUsers() {
        if(userRepository.findAll().size() > 0){
            userRepository.deleteAll();
            return "Deleted All users";
        }else{
            return "No Users Exists";
        }
    }
    
    
//    public User getUserByEmail(String Email){
//    	User user = userRepository.findByEmail(Email);
//    	
//    	return user;
//    }
}
