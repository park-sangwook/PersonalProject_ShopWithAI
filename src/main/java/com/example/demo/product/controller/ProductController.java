package com.example.demo.product.controller;

import com.example.demo.common.vo.CustomException;
import com.example.demo.common.vo.CustomInterface;
import com.example.demo.common.vo.EnumTest;
import com.example.demo.product.entity.Product;
import com.example.demo.product.service.OrderProductService;
import com.example.demo.product.service.ProductService;
import com.example.demo.product.service.RecommendationService;
import com.example.demo.product.service.ReviewService;
import com.example.demo.product.vo.OrderProductVO;
import com.example.demo.product.vo.ProductImageVO;
import com.example.demo.product.vo.ProductVO;
import com.example.demo.product.vo.ReviewVO;
import com.example.demo.user.service.PrincipalDetails;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/product")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final RecommendationService recommendationService;
    private final ProductService productService;
    private final ReviewService reviewService;
    private final OrderProductService orderProductService;

    private final ObjectMapper objectMapper;

    private final String UPLOAD_PATH = "D:/upload/review";

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


    /**
     * 리뷰 작성
     * @author : 박상욱
     * @since : 2026-03-22
     * @param : productId, reviewVO, uploadFile
     */
    @PostMapping(value = "/write-review/{productId}")
    public ResponseEntity<?> writeReviewByProductId(@PathVariable Long productId, @ModelAttribute ReviewVO reviewVO, MultipartFile uploadFile){
        log.info("리뷰 파라미터 : {}",reviewVO);
        log.info("reviewService.insertReview");
        reviewVO.setProductId(productId);
        if(Objects.nonNull(uploadFile)) {
            UUID uuidName = UUID.randomUUID();
            String fileName = uuidName + uploadFile.getOriginalFilename();
            Path target = Paths.get(UPLOAD_PATH).resolve(fileName);
            try {
                if (!Files.exists(target.getParent())) Files.createDirectories(target.getParent());
                Files.copy(uploadFile.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
                reviewVO.setUuidName(uuidName);
                reviewVO.setImage(uploadFile.getOriginalFilename());
            } catch (IOException e) {
                log.info("리뷰 작성중 문제가 발생하였습니다 : {}", e.getMessage());
                throw new CustomException("이미지 업로드 시 문제가 발생하였습니다.");
            }
        }
        reviewService.insertReview(reviewVO);
        return ResponseEntity.status(HttpStatus.OK).body("SUCCESS");
    }

    /**
     * 문의 작성
     * @author : 박상욱
     * @since : 2026-03-22
     * @param : productId
     */
    @PostMapping(value = "/QnA/{productId}")
    public ResponseEntity<?> writeQnAByProductId(@PathVariable Long productId){
        return null;
    }


    /**
     * 상품 구매
     * @author : 박상욱
     * @since : 2026-03-29
     * @param vo
     * @param details
     * @return
     */
    @CustomInterface(type = EnumTest.USER)
    @PostMapping(value = "/order")
    public ResponseEntity<?> orderProduct(@RequestBody HashMap<String,Object> vo, @AuthenticationPrincipal PrincipalDetails details){
        List<ProductVO> prods = objectMapper.convertValue(vo.get("products"), new TypeReference<List<ProductVO>>() {});
        log.info("주문 전 파라미터 : {}",vo);
        for(ProductVO pvo : prods){
            orderProductService.insertOrderProduct(pvo,details.getUsername());
        }
        return ResponseEntity.status(HttpStatus.OK).body("SUCCESS");
    }
}
