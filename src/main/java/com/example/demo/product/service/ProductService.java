package com.example.demo.product.service;

import com.example.demo.common.vo.CustomException;
import com.example.demo.product.entity.QProduct;
import com.example.demo.product.vo.ProductResponse;
import com.example.demo.product.vo.ProductVO;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.jsonwebtoken.lang.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final QProduct product = QProduct.product;
    private final JPAQueryFactory queryFactory;

    Expression<?>[] productFields = {
            product.id, product.name, product.price, product.categoryLarge.codeId.as("categoryL"),
            product.categorySmall.codeId.as("categoryS"), product.detail, product.rating,
            product.colors, product.sizes, product.createdAt
    };

    Expression<?>[] productDetailFields = {
            product.id, product.name, product.price, product.categoryLarge.codeName.as("categoryL"),
            product.categorySmall.codeName.as("categoryS"), product.detail, product.rating,
            product.colors, product.sizes, product.createdAt
    };

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

    /**
     * 카테고리별 상품조회
     * @param category
     * @return
     */
    @Transactional(readOnly = true)
    public List<ProductVO> selectProductByCategory(@PathVariable String category){
        List<ProductVO> pdv = queryFactory.select(Projections.fields(ProductVO.class,productFields)).from(product).where(product.categoryLarge.codeId.eq(category)).fetch();
        if(Collections.isEmpty(pdv))throw new CustomException("해당 카테고리가 없습니다.");
        return pdv;
    }

    /**
     * 메인페이지 상품검색
     */
    @Transactional(readOnly = true)
    public List<ProductVO> selectProductByName(String productName){
        List<ProductVO> pro = queryFactory.select(Projections.fields(ProductVO.class,productFields)).from(product).where(nameMatch(productName)).fetch();
        if(Collections.isEmpty(pro))throw new CustomException(productName+"으로 연관된 상품이 없습니다.");
        return pro;
    }


    @Transactional(readOnly = true)
    public ProductVO selectProductByProductId(long productId){
        ProductVO pro = queryFactory.select(Projections.fields(ProductVO.class,productFields)).from(product).where(product.id.eq(productId)).fetchOne();
        if(Objects.isNull(pro))throw new CustomException("상품 상세정보를 조회할 수 없습니다.");
        return pro;
    }

    private BooleanExpression nameMatch(String keyword) {
        if (keyword == null) return null;
        return Expressions.numberTemplate(Double.class,
                "function('match_against', {0}, {1})",
                product.name, "+" + keyword + "*").gt(0.0);
    }
}
