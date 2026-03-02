package com.example.demo.common.controller;

import com.example.demo.common.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/comm")
@RequiredArgsConstructor
public class CommonController {

    private final TokenService tokenService;

    @GetMapping(value = "/health-check")
    public ResponseEntity<?> healthCheck(@CookieValue(value = "refreshToken") String token){
        boolean flag = tokenService.validate(token);
        if(flag){
            return ResponseEntity.ok("SUCCESS");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("FAILED");
        }
    }
}
