package com.example.demo.common.service;

import com.example.demo.user.vo.UserVO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class TokenService {

    private final Key KEY_TOKEN = Keys.hmacShaKeyFor(EnviromentService.get("jwt-key").getBytes());

    // 유효 시간 설정 (밀리초 단위)
    private final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; // 30분
    private final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7; // 7일

    public String create(UserVO vo,long expiration){
        return Jwts.builder().setIssuedAt(new Date()).setSubject(vo.getId()).claim("role",vo.getRole())
                .setExpiration(new Date(System.currentTimeMillis()+expiration))
                .signWith(KEY_TOKEN, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createAccessToken(UserVO vo){return create(vo,ACCESS_TOKEN_EXPIRE_TIME);}
    public String createRefreshToken(UserVO vo){return create(vo,REFRESH_TOKEN_EXPIRE_TIME);}

    public UserVO getUserFromToken(String token){
        Claims claims = Jwts.parserBuilder().setSigningKey(KEY_TOKEN).build().parseClaimsJws(token).getBody();
        return UserVO.builder().id(claims.getSubject()).role(claims.get("role").toString()).build();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parserBuilder().setSigningKey(KEY_TOKEN).build().parseClaimsJwt(token);
            return true;
        }catch (Exception e){return false;}
    }
}
