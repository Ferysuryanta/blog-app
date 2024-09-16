package com.blog.application.service;

import com.blog.application.dto.UserDTO;

import java.util.List;
import java.util.UUID;

public interface UserService {

    List<UserDTO> findAll();
    UserDTO findById(final UUID id);
    UUID create(final UserDTO userDTO);
    void update(final UserDTO userDTO);
    void deleteById(final UUID id);
    UserDTO findByEmail(String username);
}
