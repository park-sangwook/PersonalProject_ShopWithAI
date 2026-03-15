package com.example.demo.common.vo;

import java.lang.annotation.*;

@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CustomInterface {
    EnumTest type() default EnumTest.USER;
}
