package com.ecommerce.project.payload;

import com.ecommerce.project.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long userId;
    private String username;
    private String email;
    private Set<Role> roles;
    private List<String> addresses;

    public Set<String> getRoles() {
        Set<String> mappedRoles = new HashSet<>();
        for(Role role:roles){
            mappedRoles.add(role.getRole().name());
        }
        return mappedRoles;
    }
}