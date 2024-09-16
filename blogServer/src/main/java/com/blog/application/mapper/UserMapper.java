package com.blog.application.mapper;

import com.blog.application.dto.UserDTO;
import com.blog.application.model.User;
import com.blog.application.repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class UserMapper {

    private final RoleRepository roleRepository;
    public UserDTO mapToDto(User user, UserDTO userDTO) {
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setFullname(user.getFullname());
        userDTO.setActive(user.isActive());
        userDTO.setCreatedDate(user.getCreatedDate());
        userDTO.setCreatedBy(user.getCreatedBy());
        userDTO.setLastModifiedDate(user.getLastModifiedDate());
        userDTO.setLastModifiedBy(user.getLastModifiedBy());
        userDTO.setRoleId(user.getRole().getId());
        return userDTO;
    }

    public User mapToEntity(UserDTO userDTO, User user) {
        user.setId(userDTO.getId());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setFullname(userDTO.getFullname());
        user.setActive(userDTO.isActive());
        user.setCreatedDate(userDTO.getCreatedDate());
        user.setCreatedBy(userDTO.getCreatedBy());
        user.setLastModifiedDate(userDTO.getLastModifiedDate());
        user.setLastModifiedBy(userDTO.getLastModifiedBy());
        user.setRole(roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new EntityNotFoundException("Role not found with id: " + userDTO.getId())));
        return user;
    }
}
