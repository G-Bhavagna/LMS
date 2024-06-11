package com.coders.lmsDemo.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String role;
}
