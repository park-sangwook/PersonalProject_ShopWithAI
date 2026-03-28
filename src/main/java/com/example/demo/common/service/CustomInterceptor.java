package com.example.demo.common.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.lang.reflect.Field;

public class CustomInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if(handler instanceof HandlerMethod){
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            MethodParameter[] methodParameters = handlerMethod.getMethodParameters();
            for(MethodParameter param : methodParameters){
                if(param.hasMethodAnnotation(ModelAttribute.class)){
                    Class<?> clazz = param.getNestedParameterType();
                    Field[] fields = clazz.getFields();
                    for(Field field : fields){
                        if(field.getName().equals("userId")){

                        }
                    }
                }
            }
        }
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
