package com.example.demo.user.service;

import com.example.demo.common.vo.CustomException;
import com.example.demo.user.entity.QUserEntity;
import com.example.demo.user.entity.UserEntity;
import com.example.demo.user.repository.UserRepository;
import com.example.demo.user.vo.UserVO;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JPAQueryFactory queryFactory;
    private final QUserEntity user = QUserEntity.userEntity;

    @Transactional(readOnly = true)
    public UserVO selectUserById(UserVO vo){
        UserEntity entity = Optional.ofNullable(queryFactory.selectFrom(user).where(user.id.eq(vo.getId())).fetchOne()).orElseThrow(()-> new CustomException("해당 아이디가 없습니다."));
        return Objects.isNull(entity) ? null : entity.toVO();
    }

    @Transactional
    public void insert(UserVO vo){
        try{
            vo.setRole("1");
            userRepository.save(vo.toEntity());
        }catch(Exception e){throw new CustomException("회원가입에 실패하였습니다.");}
    }
}
