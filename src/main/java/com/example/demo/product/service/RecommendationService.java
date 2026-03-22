package com.example.demo.product.service;

import com.example.demo.product.entity.Product;
import com.example.demo.common.vo.RecommendResponse;
import com.example.demo.product.vo.ProductImageVO;
import com.example.demo.product.vo.ProductResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationService {

    private final ProductService productService;
    public List<ProductImageVO> getRecommendations() {
        RestTemplate restTemplate = new RestTemplate();
        long productId = 1;
        String fastapiUrl = "http://localhost:8000/recommend/" + productId;

        log.info("파이썬 추천 서비스 시작 : {}",productId);
        try {
            // 1. 파이썬 서버 호출
            RecommendResponse response = restTemplate.getForObject(fastapiUrl, RecommendResponse.class);
            List<Long> recommendedIds = response.getRecommendations();

            if (recommendedIds.isEmpty()) return Collections.emptyList();

            // 2. 받은 ID들로 DB에서 상세 정보 조회
            // 예: SELECT * FROM product WHERE id IN (ID들)
            List<ProductImageVO> pro = productService.selectProductByIds(recommendedIds);
            log.info("파이썬 추천 서비스 종료 : {}",pro);
            return pro;

        } catch (Exception e) {
            // 파이썬 서버가 꺼져있거나 에러 발생 시 빈 리스트 반환 (서비스 중단 방지)
            log.info("파이썬 에러 : {}", (Object) e.getStackTrace());
            return Collections.emptyList();
        }
    }
}