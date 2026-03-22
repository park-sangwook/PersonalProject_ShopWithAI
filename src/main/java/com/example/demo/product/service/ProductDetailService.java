package com.example.demo.product.service;

import com.example.demo.product.entity.QProductDetail;
import com.example.demo.product.repository.ProductDetailRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductDetailService {

    private final QProductDetail productDetail = QProductDetail.productDetail;
    private final ProductDetailRepository productDetailRepository;
    private final JPAQueryFactory queryFactory;

}
