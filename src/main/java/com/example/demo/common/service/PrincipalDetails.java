package com.example.demo.common.service;

import com.example.demo.user.vo.UserVO;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@ToString
public class PrincipalDetails implements UserDetails {

    private UserVO vo;

    public PrincipalDetails(UserVO vo){
        this.vo = vo;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return  Collections.singleton(new SimpleGrantedAuthority(getRole(vo.getRole())));
    }

    private String getRole(String role){
        return "ROLE_"+(role.equals("1")?"USER":"ADMIN");
    }

    @Override
    public String getPassword() {
        return vo.getPassword();
    }

    @Override
    public String getUsername() {
        return vo.getId();
    }
}
