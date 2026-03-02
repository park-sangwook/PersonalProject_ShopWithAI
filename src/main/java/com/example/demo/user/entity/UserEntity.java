package com.example.demo.user.entity;

import com.example.demo.user.vo.UserVO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "user")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserEntity {
    @Id
    @NotNull
    private String id;

    @Column
    private String password;

    @Column
    private String role;

    public UserVO toVO(){
        return UserVO.builder().id(this.id).password(this.password).role(this.role).build();
    }
}
