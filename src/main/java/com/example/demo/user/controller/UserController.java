package com.example.demo.user.controller;

import com.example.demo.common.service.TokenService;
import com.example.demo.user.service.UserService;
import com.example.demo.user.vo.UserVO;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping(value = "/api/user")
@RequiredArgsConstructor
public class UserController {

    private final TokenService tokenService;
    private final UserService userService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> loginOk(@RequestBody UserVO vo, HttpServletResponse response){
        String accessToken = tokenService.createAccessToken(vo);
        String refreshToken = tokenService.createRefreshToken(vo);

        ResponseCookie cookie = ResponseCookie.from("refreshToken",refreshToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("LAX")
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(Collections.singletonMap("accessToken",accessToken));
    }

    @PostMapping(value = "/refresh")
    public ResponseEntity<?> accessUpdate(@CookieValue(value = "/refreshToken") String token){
        try{
            UserVO vo = tokenService.getUserFromToken(token);
            String accessToken = tokenService.createAccessToken(vo);
            return ResponseEntity.ok(Collections.singletonMap("accessToken",accessToken));
        }catch(Exception e){return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("유효하지 않은 refreshToken입니다.");}
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<?> signupOk(@RequestBody UserVO vo){
        userService.insert(vo);
        return ResponseEntity.ok("SUCCESS");
    }
}
