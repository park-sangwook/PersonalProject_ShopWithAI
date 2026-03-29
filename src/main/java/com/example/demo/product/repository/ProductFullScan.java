package com.example.demo.product.repository;

import com.example.demo.product.entity.QProduct;
import com.example.demo.product.entity.QProductImage;
import com.example.demo.product.vo.ProductImageVO;
import com.example.demo.product.vo.ProductVO;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ProductFullScan {

    private final JPAQueryFactory queryFactory;
    private final QProduct product = QProduct.product;
    private final QProductImage productImage = QProductImage.productImage;

    public List<ProductImageVO> searchByFullText(String keyword) {
        if (keyword == null || keyword.isBlank()) return List.of();

        // 검색어 가공: '+청자켓*' (청자켓이 반드시 포함된 모든 단어 검색)
        String formattedKeyword = "+" + keyword + "*";

        Expression<?>[] productFieldsWithImage = {
                product.id, product.name, product.price, product.categoryLarge.codeName.as("categoryL"),
                product.categorySmall.codeName.as("categoryS"), product.detail, product.rating,
                product.colors, product.sizes, product.createdAt,product.newArrivals,productImage.mainImage,productImage.thumnail1
        };

        return queryFactory
                .select(Projections.bean(ProductImageVO.class,productFieldsWithImage))
                .from(product).leftJoin(productImage).on(product.id.eq(productImage.productId))
                .where(
                        // 3단계에서 등록한 커스텀 함수 호출
                        Expressions.numberTemplate(Double.class,
                                "function('match_against', {0}, {1})",
                                product.name,
                                formattedKeyword
                        ).gt(0.0) // 연관도 점수가 0보다 큰 것만 가져옴
                )
                .fetch();
    }
}