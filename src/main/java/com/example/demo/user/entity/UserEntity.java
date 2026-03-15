package com.example.demo.user.entity;

import com.example.demo.user.vo.UserVO;
import jakarta.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

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
