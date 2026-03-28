package com.example.demo.product.service;

import com.example.demo.product.entity.Product;
import com.example.demo.product.entity.QReviewEntity;
import com.example.demo.product.entity.ReviewEntity;
import com.example.demo.product.repository.ProductRepository;
import com.example.demo.product.repository.ReviewRepository;
import com.example.demo.product.vo.ReviewVO;
import com.example.demo.user.entity.UserEntity;
import com.example.demo.user.repository.UserRepository;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final JPAQueryFactory queryFactory;
    private final QReviewEntity review = QReviewEntity.reviewEntity;

    Expression<?>[] reviewEx = {review.user.id,review.product.id,review.content,review.uuidName,review.createdAt,review.updatedAt,review.image,review.rating};

    @Transactional(readOnly = true)
    public List<ReviewVO> selectReviewByProductId(Long productId){
        List<ReviewVO> res = queryFactory.select(Projections.fields(ReviewVO.class,reviewEx))
                .from(review).where(review.product.id.eq(productId)).fetch();
        if(Collections.isEmpty(res))log.info("해당 상품에 저장된 리뷰가 없습니다.");
        return res;
    }

    @Transactional
    public void insertReview(ReviewVO vo){
        Product product = productRepository.getReferenceById(vo.getProductId());
        UserEntity user = userRepository.getReferenceById(vo.getUserId());
        reviewRepository.save(ReviewEntity.toEntity(vo,product,user));
        log.info("리뷰 저장 완료 : {}",vo);
    }

    @Transactional(readOnly = true)
    public List<ReviewVO> selectReviewByUserId(String userId){
        List<ReviewVO> res = queryFactory.select(Projections.fields(ReviewVO.class,reviewEx))
                .from(review).where(review.user.id.eq(userId)).fetch();
        if(Collections.isEmpty(res))log.info(userId+"님이 작성한 리뷰가 없습니다.");
        return res;
    }
}
