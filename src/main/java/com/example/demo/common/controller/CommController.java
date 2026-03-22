package com.example.demo.common.controller;

import com.example.demo.common.service.TokenService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping(value = "/api/comm")
@RequiredArgsConstructor
public class CommController {

    private final TokenService tokenService;
    /**
     * 선정된 url 이외에 모든 api요청에 대해 accessToken이 유효한지 체크
     * @author : 박상욱
     * @since : 2026-03-22
     * @return
     */
    @GetMapping(value = "/health-check")
    public ResponseEntity<?> healthCheck(HttpServletResponse response){
        String token = tokenService.resolve(response);
        if(token == null && tokenService.validateToken(token)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("errorMessage","accessToken이 만료되었습니다."));
        }
        return ResponseEntity.status(HttpStatus.OK).body("SUCCESS");
    }
}
