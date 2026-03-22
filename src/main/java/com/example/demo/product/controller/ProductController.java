package com.example.demo.product.controller;

import com.example.demo.product.entity.Product;
import com.example.demo.product.service.ProductService;
import com.example.demo.product.service.RecommendationService;
import com.example.demo.product.vo.ProductImageVO;
import com.example.demo.product.vo.ProductResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class ProductController {

    private final RecommendationService recommendationService;
    private final ProductService productService;

    /**
    * Fast-API와 ScikitLearn을 활용한 마지막에 구매한 물품을 기준으로 유사한 물품 추천해주는 사용자 맟춤 추천 서비스
    * @author : 박상욱
    * @since : 2026-03-14
    * @return : 마지막 구매한 뭂품과 유사한 5개 물품 조회
    * */
    @GetMapping(value = "/recommend")
    public ResponseEntity<?> recommendProduct(){
        List<ProductImageVO> pro = recommendationService.getRecommendations();
        log.info("recommendationService.getRecommendations : {}",pro);
        return ResponseEntity.status(HttpStatus.OK).body(pro);
    }

    /**
     * 전체 카테고리 상품 조회
     * @author : 박상욱
     * @since : 2026-03-22
     */
    @GetMapping(value = "/all")
    public ResponseEntity<?> selectProductAll(){
        log.info("productService.selectProductAll");
        return ResponseEntity.status(HttpStatus.OK).body(productService.selectProductAll());
    }

    /**
     * 각 물품별로 select해주는 handler-mapping
     * @author : 박상욱
     * @since : 2026-03-21
     * @param : category : 카테고리 바인딩
     * @return : product테이블에서 해당 카테고리의 물품 조회
     */
    @GetMapping(value = "/category/{category}")
    public ResponseEntity<?> selectCategory(@PathVariable String category){
        log.info("productService.selectProductByCategory");
        return ResponseEntity.status(HttpStatus.OK).body(productService.selectProductByCategory(category));
    }

    /**
     * 메인페이지에서 상품검색
     * @author : 박상욱
     * @since : 2026-03-21
     * @param : productName
     */
    @GetMapping(value = "/search/{productName}")
    public ResponseEntity<?> searchProductName(@PathVariable String productName){
        return ResponseEntity.status(HttpStatus.OK).body(productService.selectProductByName(productName));
    }

    /**
     * 상품 상세 정보
     * @author : 박상욱
     * @since : 2026-03-21
     * @param : productId
     */
    @GetMapping(value = "/{productId}")
    public ResponseEntity<?> selectProductByProductId(@PathVariable long productId){
        return ResponseEntity.status(HttpStatus.OK).body(productService.selectProductByProductId(productId));
    }

    /**
     * 메인페이지 > 신상 물품 조회
     * @author : 박상욱
     * @since : 2026-03-22
     * @return : 신상(new_arrivals = 'Y') 리턴
     */
    @GetMapping(value = "/new_arrivals")
    public ResponseEntity<?> selectProductNewArrivals(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.selectProductNewArrivals());
    }


}
