package com.example.demo.common.service;

import com.example.demo.user.vo.UserVO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.util.Date;
import java.util.Objects;

@Service
@Slf4j
public class TokenService {

    private final Key KEY_TOKEN = Keys.hmacShaKeyFor(EnviromentService.get("jwt-key").getBytes());

    // 유효 시간 설정 (밀리초 단위)
    private final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; // 30분
    private final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7; // 7일

    public String create(UserVO vo,long expiration){
        log.info("토큰 생성 전 vo 상태확인 : {}",vo);
        return Jwts.builder().setIssuedAt(new Date()).setSubject(vo.getId()).claim("role",vo.getRole())
                .setExpiration(new Date(System.currentTimeMillis()+expiration))
                .signWith(KEY_TOKEN, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createAccessToken(UserVO vo){return create(vo,ACCESS_TOKEN_EXPIRE_TIME);}
    public String createRefreshToken(UserVO vo){return create(vo,REFRESH_TOKEN_EXPIRE_TIME);}

    public UserVO getUserFromToken(String token){
        Claims claims = Jwts.parserBuilder().setSigningKey(KEY_TOKEN).build().parseClaimsJws(token).getBody();
        return UserVO.builder().id(claims.getSubject()).role(claims.get("role",String.class)).build();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parserBuilder().setSigningKey(KEY_TOKEN).build().parseClaimsJws(token);
            log.info("토큰 유효성 통과");
            return true;
        }catch (Exception e){log.info("토큰 유효성 실패"); return false;}
    }

    public String resolve(HttpServletResponse response){
        String token = response.getHeader("Authorization");
        return (Objects.nonNull(token) && StringUtils.hasText("Bearer "))?token.substring(7):null;
    }

    public String resolve(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        return (Objects.nonNull(token) && StringUtils.hasText("Bearer "))?token.substring(7):null;
    }
}
