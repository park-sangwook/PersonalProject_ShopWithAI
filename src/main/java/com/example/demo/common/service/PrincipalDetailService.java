package com.example.demo.common.service;

import com.example.demo.common.vo.CustomException;
import com.example.demo.user.entity.QUserEntity;
import com.example.demo.user.entity.UserEntity;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PrincipalDetailService implements UserDetailsService {

    private final QUserEntity user = QUserEntity.userEntity;
    private final JPAQueryFactory queryFactory;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity entity = Optional.ofNullable(queryFactory.selectFrom(user).where(user.id.eq(username)).fetchOne()).orElseThrow(()-> new CustomException("해당 아이디가 없습니다."));
        return new PrincipalDetails(entity.toVO());
    }
}
