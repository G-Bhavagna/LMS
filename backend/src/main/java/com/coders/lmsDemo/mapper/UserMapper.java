package com.coders.lmsDemo.mapper;

import com.coders.lmsDemo.dto.UserDto;
import com.coders.lmsDemo.enitities.User;

public class UserMapper {

    public static UserDto toDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setEmail(user.getEmail());
        userDto.setPhone(user.getPhone());
        userDto.setRole(user.getRole());
        return userDto;
    }

    public static User dtoToUser(UserDto user) {
        User temp = new User();
        temp.setUsername(user.getUsername());
        temp.setPassword(user.getPassword());
        temp.setEmail(user.getEmail());
        temp.setPhone(user.getPhone());
        return temp;
    }
}
