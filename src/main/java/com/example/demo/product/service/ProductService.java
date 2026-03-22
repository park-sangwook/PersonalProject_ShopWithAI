package com.example.demo.product.service;

import com.example.demo.common.vo.CustomException;
import com.example.demo.product.entity.QProduct;
import com.example.demo.product.entity.QProductDetail;
import com.example.demo.product.entity.QProductImage;
import com.example.demo.product.vo.ProductDetailVO;
import com.example.demo.product.vo.ProductImageVO;
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
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final QProduct product = QProduct.product;
    private final QProductImage productImage = QProductImage.productImage;
    private final QProductDetail productDetail = QProductDetail.productDetail;
    private final JPAQueryFactory queryFactory;

    Expression<?>[] productFields = {
            product.id, product.name, product.price, product.categoryLarge.codeId.as("categoryL"),
            product.categorySmall.codeId.as("categoryS"), product.detail, product.rating,
            product.colors, product.sizes, product.createdAt,product.newArrivals
    };

    Expression<?>[] productFieldsWithImage = {
            product.id, product.name, product.price, product.categoryLarge.codeName.as("categoryL"),
            product.categorySmall.codeName.as("categoryS"), product.detail, product.rating,
            product.colors, product.sizes, product.createdAt,product.newArrivals,productImage.mainImage,productImage.thumnail1,
            productImage.thumnail2,Projections.fields(ProductDetailVO.class,productDetail.detailImage1
                ,productDetail.detailImage2,productDetail.detailImage3,productDetail.title,productDetail.content).as("productDetail")
    };


    @Transactional(readOnly = true)
    public List<ProductImageVO> selectProductByIds(List<Long> ids){
        JPQLQuery<Long> p1 = JPAExpressions.select(product.id).from(product).where(product.id.in(ids));
        System.out.println("P1 : "+p1);
        List<ProductImageVO> result = queryFactory
                .select(Projections.fields(ProductImageVO.class,productFieldsWithImage))
                .from(product).leftJoin(productImage).on(product.id.eq(productImage.productId))
                .where(product.id.in(p1))
                .fetch();

        if (result.isEmpty()) {
            throw new CustomException("해당 상품들이 없습니다.");
        }

        return result;
    }

    @Transactional(readOnly = true)
    public List<ProductImageVO> selectProductAll(){
        List<ProductImageVO> pivo = queryFactory.select(Projections.fields(ProductImageVO.class,productFieldsWithImage))
                .from(product).leftJoin(productImage).on(product.id.eq(productImage.productId))
                .fetch();
        if(Collections.isEmpty(pivo))log.info("상품이 없습니다.");
        return pivo;
    }

    /**
     * 카테고리별 상품조회
     * @param category
     * @return
     */
    @Transactional(readOnly = true)
    public List<ProductImageVO> selectProductByCategory(@PathVariable String category){
        List<ProductImageVO> pdv = queryFactory.select(Projections.fields(ProductImageVO.class,productFieldsWithImage))
                .from(product).leftJoin(productImage).on(product.id.eq(productImage.productId))
                .where(product.categoryLarge.codeId.eq(category)).fetch();
        if(Collections.isEmpty(pdv))throw new CustomException("해당 카테고리가 없습니다.");
        return pdv;
    }

    /**
     * 메인페이지 상품검색
     */
    @Transactional(readOnly = true)
    public List<ProductImageVO> selectProductByName(String productName){
        List<ProductImageVO> pro = queryFactory.select(Projections.fields(ProductImageVO.class,productFieldsWithImage))
                .from(product).leftJoin(productImage).on(product.id.eq(productImage.productId))
                .where(nameMatch(productName)).fetch();
        if(Collections.isEmpty(pro))throw new CustomException(productName+"으로 연관된 상품이 없습니다.");
        return pro;
    }


    @Transactional(readOnly = true)
    public ProductImageVO selectProductByProductId(long productId){
        ProductImageVO pro = queryFactory.select(Projections.fields(ProductImageVO.class,productFieldsWithImage))
                .from(product).join(productImage).on(product.id.eq(productImage.productId))
                .where(product.id.eq(productId)).fetchOne();
        if(Objects.isNull(pro))throw new CustomException("상품 상세정보를 조회할 수 없습니다.");
        return pro;
    }

    public List<ProductImageVO> selectProductNewArrivals(){
        List<ProductImageVO> pivo = queryFactory.select(Projections.fields(ProductImageVO.class,productFieldsWithImage))
                .from(product).leftJoin(productImage).on(product.id.eq(productImage.productId))
                .where(product.newArrivals.eq("Y")).fetch();
        if(Collections.isEmpty(pivo))log.info("신상물품이 없습니다");
        return pivo;
    }



    private BooleanExpression nameMatch(String keyword) {
        if (keyword == null) return null;
        return Expressions.numberTemplate(Double.class,
                "function('match_against', {0}, {1})",
                product.name, "+" + keyword + "*").gt(0.0);
    }
}
