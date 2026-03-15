package com.example.demo.product.service;

import com.example.demo.product.entity.Product;
import com.example.demo.common.vo.CustomException;
import com.example.demo.product.entity.QProduct;
import com.example.demo.product.vo.ProductResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final QProduct product = QProduct.product;
    private final JPAQueryFactory queryFactory;

    @Transactional(readOnly = true)
    public List<ProductResponse> selectProductByIds(List<Long> ids){
        JPQLQuery<Long> p1 = JPAExpressions.select(product.id).from(product).where(product.id.in(ids));
        System.out.println("P1 : "+p1);
        List<ProductResponse> result = queryFactory
                .select(Projections.constructor(ProductResponse.class, product.id, product.name))
                .from(product)
                .where(product.id.in(p1))
                .fetch();

        if (result.isEmpty()) {
            throw new CustomException("해당 상품들이 없습니다.");
        }

        return result;
    }
}
