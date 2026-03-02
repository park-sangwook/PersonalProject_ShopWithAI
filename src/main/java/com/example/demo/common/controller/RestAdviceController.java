package com.example.demo.common.controller;

import com.example.demo.common.vo.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Collections;

@RestControllerAdvice
public class RestAdviceController {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> customException(CustomException e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMsg());
    }

    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<?> requestException(HttpClientErrorException e){
        String errorMessage = e.getResponseBodyAsString();
        String errorKey = e.getStatusCode().toString();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap(errorKey,errorMessage));
    }
}
