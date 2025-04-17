package com.ecommerce.project.repositories;

import com.ecommerce.project.model.AppUser;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser,Long> {
    Optional<AppUser> findByUsername(String username);

    Optional<AppUser> findByEmail(@NotBlank @Size(max = 50) @Email String email);
}
