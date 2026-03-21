package com.example.demo.category.controller;

import com.example.demo.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/category")
@RequiredArgsConstructor
@Slf4j
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * 카테고리 대분류 조회
     * @author : 박상욱
     * @since : 2026-03-21
     * @version : 0.0.1
     */
    @GetMapping(value = "/category_l")
    public ResponseEntity<?> selectCategoryL(){
        log.info("categoryService.selectCategoryL");
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.selectCategoryL());
    }
}
