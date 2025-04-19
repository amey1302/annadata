package com.annadata.repository;

import com.annadata.dto.UserResponseDTO;
import com.annadata.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    User findByEmail(String email);

}
