package com.example.demo.user.vo;

import com.example.demo.user.entity.UserEntity;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter@Setter
@NoArgsConstructor@AllArgsConstructor
@Builder
public class UserVO {
    private Long seq;
    @NotNull(message = "id는 필수요소입니다.")
    private String id;
    private String password;
    private String role;

    public UserEntity toEntity(){
        return UserEntity.builder().id(this.id).password(this.password).role_name(this.role).build();
    }
}
