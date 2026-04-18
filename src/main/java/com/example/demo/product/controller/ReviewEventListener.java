package com.example.demo.product.controller;

import com.example.demo.product.service.ReviewService;
import com.example.demo.product.vo.ReviewPublishEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
@Slf4j
public class ReviewEventListener {

    private final StringRedisTemplate redisTemplate;
    private final String REVIEW_KEY = "prod:";

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handlerEventListener(ReviewPublishEvent event){
//        reviewService.incrementReviewCount(event.productId());
        String key = REVIEW_KEY + event.vo().getProductId();
        redisTemplate.opsForHash().increment(key,"reviewCount",1);
        log.info("리뷰 카운트 redis 증가 완료");
    }

}
