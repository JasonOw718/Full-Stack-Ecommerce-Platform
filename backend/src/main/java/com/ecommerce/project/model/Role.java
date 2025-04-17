package com.ecommerce.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "role")
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;
    @Enumerated(EnumType.STRING)
    private AppRole role;

    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private List<AppUser> users = new ArrayList<>();

    public Role(AppRole role) {
        this.role = role;
    }
}
