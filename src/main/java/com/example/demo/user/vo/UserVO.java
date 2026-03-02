package com.example.demo.user.vo;

import com.example.demo.user.entity.UserEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserVO {
    private String id;
    private String password;
    private String role;

    public UserEntity toEntity(){
        return UserEntity.builder().id(this.id).password(this.password).role(this.role).build();
    }
}
