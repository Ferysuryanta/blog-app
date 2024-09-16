package com.blog.application.service;

import com.blog.application.dto.UserDTO;
import com.blog.application.mapper.UserMapper;
import com.blog.application.model.User;
import com.blog.application.repository.RoleRepository;
import com.blog.application.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    @Override
    public List<UserDTO> findAll() {
        final List<User> users = userRepository.findAll(Sort.by("lastModifiedDate").descending());
        return users.stream()
                .map(user -> userMapper.mapToDto(user, new UserDTO()))
                .toList();
    }

    @Override
    public UserDTO findById(UUID id) {
        return userRepository.findById(id)
                .map(user -> userMapper.mapToDto(user, new UserDTO()))
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

    @Override
    public UUID create(UserDTO userDTO) {
        var user = new User();
        userMapper.mapToEntity(userDTO, user);
        return userRepository.save(user).getId();
    }

    @Override
    public void update(UserDTO userDTO) {
        final var user = userRepository.findById(userDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userDTO.getId()));
        userMapper.mapToEntity(userDTO, user);
        userRepository.save(user);
    }

    @Override
    public void deleteById(UUID id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDTO findByEmail(String username) {
        return userRepository.findByEmail(username)
                .map(user -> userMapper.mapToDto(user, new UserDTO()))
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + username));
    }
}
