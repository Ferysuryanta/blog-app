package com.blog.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private UUID id;
    private String email;
    private String password;
    private String fullname;
    private boolean active = true;
    private LocalDateTime createdDate;
    private UUID createdBy;
    private LocalDateTime lastModifiedDate;
    private UUID lastModifiedBy;
    private Integer roleId;
}
