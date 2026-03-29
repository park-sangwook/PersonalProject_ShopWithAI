package com.example.demo.product.service;

import com.example.demo.product.entity.Product;
import com.example.demo.product.entity.QReviewEntity;
import com.example.demo.product.entity.ReviewEntity;
import com.example.demo.product.repository.ProductRepository;
import com.example.demo.product.repository.ReviewRepository;
import com.example.demo.product.vo.ProductStatsVO;
import com.example.demo.product.vo.ReviewPublishEvent;
import com.example.demo.product.vo.ReviewVO;
import com.example.demo.user.entity.UserEntity;
import com.example.demo.user.repository.UserRepository;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {
    private final ApplicationEventPublisher applicationEventPublisher;
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final JPAQueryFactory queryFactory;
    private final JdbcTemplate jdbcTemplate;
    private final QReviewEntity review = QReviewEntity.reviewEntity;

    Expression<?>[] reviewEx = {review.user.id,review.product.id,review.content,review.uuidName,review.createdAt,review.updatedAt,review.image,review.rating};

    private final RedisTemplate<String, Object> redisTemplate;
    private static final String REVIEW_COUNT_KEY = "prod:stats:";

    // 리뷰가 작성될 때 호출되는 메서드
    public void incrementReviewCount(Long productId) {
        String key = REVIEW_COUNT_KEY + productId;

        // Redis의 INCR 명령어와 동일 (원자적 연산이라 동시성 이슈 없음)
        redisTemplate.opsForHash().increment(key,"reviewCount",1);
    }

    // 리뷰 개수 조회 메서드
    public Integer getReviewCount(Long productId) {
        String key = REVIEW_COUNT_KEY + productId;
        Object count = redisTemplate.opsForHash().get(key,"reviewCount");

        return count != null ? (Integer) count : 0;
    }

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
        applicationEventPublisher.publishEvent(new ReviewPublishEvent(product.getId(),product.getReviewCount(),product.getRating()));
        log.info("리뷰 저장 완료 : {}",vo);
    }

    @Transactional(readOnly = true)
    public List<ReviewVO> selectReviewByUserId(String userId){
        List<ReviewVO> res = queryFactory.select(Projections.fields(ReviewVO.class,reviewEx))
                .from(review).where(review.user.id.eq(userId)).fetch();
        if(Collections.isEmpty(res))log.info(userId+"님이 작성한 리뷰가 없습니다.");
        return res;
    }


    /**
     * redis로 상품 별 리뷰 갯수, 평점을 배치로 bulkUpdate하는 서비스로직
     * @author : 박상욱
     * @since : 2026-03-29
     * @param pstvo
     */
    @Transactional
    public void bulkUpdate(List<ProductStatsVO> pstvo){
        String sql = "UPDATE PRODUCT SET REVIEW_COUNT = REVIEW_COUNT + ? WHERE PRODUCT_ID = ?";
        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                ps.setLong(1, pstvo.get(i).getReviewCount());
                ps.setLong(2,pstvo.get(i).getProductId());
            }

            @Override
            public int getBatchSize() {
                return 1000;
            }
        });
    }
}
