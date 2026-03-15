package com.example.demo.user.service;

import com.example.demo.common.vo.CustomException;
import com.example.demo.user.entity.QUserEntity;
import com.example.demo.user.entity.UserEntity;
import com.example.demo.user.repository.UserRepository;
import com.example.demo.user.vo.UserVO;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional(readOnly = true)
    public UserVO selectUserById(UserVO vo){
        UserEntity entity = Optional.ofNullable(queryFactory.selectFrom(user).where(user.id.eq(vo.getId())).fetchOne()).orElseThrow(()-> new CustomException("해당 아이디가 없습니다."));
        if(!bCryptPasswordEncoder.matches(vo.getPassword(),entity.getPassword())){
            throw new CustomException("비밀번호가 일치하지 않습니다.");
        }
        return entity.toVO();
    }

    @Transactional
    public void insert(UserVO vo){
        try{
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
        }catch(Exception e){
            log.info("회원가입 에러 : {}",e.getStackTrace());
            throw new CustomException("회원가입에 실패하였습니다.");
        }
    }

}
