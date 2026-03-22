package com.example.demo.user.controller;

import com.example.demo.common.service.TokenService;
import com.example.demo.common.vo.CustomInterface;
import com.example.demo.common.vo.EnumTest;
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
import java.util.HashMap;

@RestController
@RequestMapping(value = "/api/user")
@RequiredArgsConstructor
public class UserController {

    private final TokenService tokenService;
    private final UserService userService;

    @CustomInterface(type = EnumTest.USER)
    @PostMapping(value = "/login")
    public ResponseEntity<?> loginOk(@RequestBody UserVO vo, HttpServletResponse response){
        UserVO uvo = userService.selectUserById(vo);
        String accessToken = tokenService.createAccessToken(uvo);
        String refreshToken = tokenService.createRefreshToken(uvo);

        ResponseCookie cookie = ResponseCookie.from("refreshToken",refreshToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("LAX")
                .build();

        HashMap<String,Object> data = new HashMap<>();
        data.put("accessToken",accessToken);
        data.put("user",uvo);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(data);
    }

    @PostMapping(value = "/logout")
    public ResponseEntity<?> logoutOk(){

        ResponseCookie cookie = ResponseCookie.from("refreshToken", "") // 값을 비우거나 더미 값 입력
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0) // 만료 시간을 0으로 설정하여 즉시 삭제
                .sameSite("Lax")
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body("SUCCESS");
    }

    @PostMapping(value = "/refresh")
    public ResponseEntity<?> accessUpdate(@CookieValue(value = "/refreshToken") String token){
        try{
            UserVO vo = tokenService.getUserFromToken(token);
            String accessToken = tokenService.createAccessToken(vo);
            return ResponseEntity.ok(Collections.singletonMap("accessToken",accessToken));
        }catch(Exception e){return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("errorMessage","유효하지 않은 refreshToken입니다."));}
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<?> signupOk(@RequestBody UserVO vo){
        userService.insert(vo);
        return ResponseEntity.ok("SUCCESS");
    }
}
