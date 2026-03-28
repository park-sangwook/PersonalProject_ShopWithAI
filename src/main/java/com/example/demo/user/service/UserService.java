package com.example.demo.user.service;

import com.example.demo.common.vo.CustomException;
import com.example.demo.user.entity.QUserEntity;
import com.example.demo.user.entity.UserEntity;
import com.example.demo.user.repository.UserRepository;
import com.example.demo.user.vo.UserVO;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final JPAQueryFactory queryFactory;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final QUserEntity user = QUserEntity.userEntity;

    Expression<?>[] userEx = {user.id,user.seq,user.role_name.as("role"),user.password};

    @Transactional(readOnly = true)
    public UserVO selectUserById(UserVO vo){
        UserVO entity = Optional.ofNullable(queryFactory.select(Projections.bean(UserVO.class,userEx)).from(user).where(user.id.eq(vo.getId())).fetchOne()).orElseThrow(()-> new CustomException("해당 아이디가 없습니다."));
        log.info("role 확인 : {}",entity.getRole());
        if(!bCryptPasswordEncoder.matches(vo.getPassword(),entity.getPassword())){
            throw new CustomException("비밀번호가 일치하지 않습니다.");
        }
        log.info("로그인 후 vo : {}",entity);
        return entity;
    }

    @Transactional(readOnly = true)
    public UserVO selectUserById(String userId){
        UserEntity entity = Optional.ofNullable(queryFactory.selectFrom(user).where(user.id.eq(userId)).fetchOne()).orElseThrow(()-> new CustomException("해당 아이디가 없습니다."));
        return entity.toVO();
    }

    @Transactional
    public void insert(UserVO vo){
        UserEntity entity = queryFactory.selectFrom(user).where(user.id.eq(vo.getId())).fetchOne();
        log.info("로그인 엔티티 : {}",entity);
        if(Objects.isNull(entity)){
            String encodedPassword = bCryptPasswordEncoder.encode(vo.getPassword());
            vo.setRole("1");
            vo.setPassword(encodedPassword);
            userRepository.save(vo.toEntity());
        }else{
            throw new CustomException("해당 아이디는 이미 존재합니다.");
        }
    }

    @Transactional(readOnly = true)
    public List<UserVO> selectUserAll(){
        List<UserVO> res = queryFactory.select(Projections.fields(UserVO.class,userEx))
                .from(user).where(user.role_name.eq("1")).fetch();
        if(Collections.isEmpty(res))log.info("일반사용자 유저가 없습니다.");
        return res;
    }
}
