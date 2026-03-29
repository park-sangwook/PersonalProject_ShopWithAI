package com.example.demo.product.controller;

import com.example.demo.product.service.ReviewService;
import com.example.demo.product.vo.ReviewPublishEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class ReviewEventListener {
    private final ReviewService reviewService;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handlerEventListener(ReviewPublishEvent event){
        reviewService.incrementReviewCount(event.productId());
    }

}
