package com.example.demo.product.controller;

import com.example.demo.product.entity.Product;
import com.example.demo.product.service.RecommendationService;
import com.example.demo.product.vo.ProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final RecommendationService recommendationService;

    @GetMapping(value = "/recommend/{item_id}")
    public ResponseEntity<?> recommendProduct(@PathVariable Long item_id){
        List<ProductResponse> pro = recommendationService.getRecommendations(item_id);
        return ResponseEntity.status(HttpStatus.OK).body(pro);
    }
}
