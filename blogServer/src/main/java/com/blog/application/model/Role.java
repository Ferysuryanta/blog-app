package com.blog.application.model;

import com.blog.application.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "tbl_role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private RoleEnum name;

    private String description;

    @OneToMany(mappedBy = "role")
    private Set<User> users = new HashSet<>();
}
