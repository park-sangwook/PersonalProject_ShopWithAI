package com.example.demo.common.service;

import com.example.demo.common.vo.CustomInterface;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class CustomAOP {

    @Before("@annotation(ci)")
    public void aopPractice(JoinPoint joinPoint, CustomInterface ci){
      log.info("AOP 테스트 : {}",ci.type());
    }
}
