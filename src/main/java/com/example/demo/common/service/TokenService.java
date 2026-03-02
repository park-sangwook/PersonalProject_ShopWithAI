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

    private final Key TOKENKEY = Keys.hmacShaKeyFor(EnviromentService.get("jwt-key").getBytes());

    private final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; // 30분
    private final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7; // 7일

    public String create(UserVO vo, long expiration){
        return Jwts.builder().setSubject(vo.getId()).claim("role",vo.getRole()).signWith(TOKENKEY, SignatureAlgorithm.HS256)
                .setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis()+expiration)).compact();
    }

    public UserVO getUserFromToken(String token){
        Claims claims = Jwts.parserBuilder().setSigningKey(TOKENKEY).build().parseClaimsJwt(token).getBody();
        return UserVO.builder().id(claims.getSubject()).role(claims.get("role").toString()).build();
    }

    public String createAccessToken(UserVO vo){return create(vo,ACCESS_TOKEN_EXPIRE_TIME);}
    public String createRefreshToken(UserVO vo){return create(vo,REFRESH_TOKEN_EXPIRE_TIME);}

    public boolean validate(String token){
        try{
            Jwts.parserBuilder().setSigningKey(TOKENKEY).build().parseClaimsJwt(token);
            return true;
        }catch(Exception e) {return false;}
    }
}
