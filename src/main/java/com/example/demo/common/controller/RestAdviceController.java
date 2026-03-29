package com.example.demo.common.controller;

import com.example.demo.common.vo.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;
import java.util.HashMap;

@RestControllerAdvice
@Slf4j
public class RestAdviceController {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> validException(MethodArgumentNotValidException e){
        HashMap<String,String> error = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(err -> error.put("errorMessage",err.getDefaultMessage()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> customException(CustomException e){
        log.info("에러 : {}",e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("errorMessage",e.getMessage()));
    }

}
