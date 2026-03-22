package com.example.demo.user.service;

import com.example.demo.common.vo.CustomException;
import com.example.demo.product.entity.*;
import com.example.demo.product.repository.CartItemRepository;
import com.example.demo.product.repository.ProductRepository;
import com.example.demo.product.service.ProductService;
import com.example.demo.product.vo.CartItemVO;
import com.example.demo.product.vo.ProductImageVO;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.jsonwebtoken.lang.Collections;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MypageService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final JPAQueryFactory queryFactory;

    private final QCartItem cartItem = QCartItem.cartItem;
    private final QProduct product = QProduct.product;
    private final QProductImage productImage = QProductImage.productImage;
    Expression<?>[] productFieldsWithImage = {
            product.id, product.name, product.price, product.categoryLarge.codeName.as("categoryL"),
            product.categorySmall.codeName.as("categoryS"), product.detail, product.rating,
            product.colors, product.sizes, product.createdAt,product.newArrivals,productImage.mainImage,productImage.thumnail1
    };
    Expression<?>[] cartItemFields = {cartItem.userId,Projections.fields(ProductImageVO.class,productFieldsWithImage).as("product") };

    @Transactional
    public void insertCartItem(Long productId,String userId){
        Product productProxy = productRepository.getReferenceById(productId);
        cartItemRepository.save(CartItem.builder().userId(userId).product(productProxy).build());
    }

    @Transactional(readOnly = true)
    public List<CartItemVO> selectCartItem(String userId){
        List<CartItemVO> civo = queryFactory.select(Projections.fields(CartItemVO.class,cartItemFields))
                .from(cartItem).leftJoin(productImage).on(cartItem.product.id.eq(productImage.productId))
                .where(cartItem.userId.eq(userId)).fetch();
        if(Collections.isEmpty(civo))log.info("장바구니에 저장된 물품이 없습니다.");
        return civo;
    }

    @Transactional
    public void deleteCartItemByIdx(Long idx){
        try {
            cartItemRepository.deleteByProductId(idx);
        }catch(Exception e){
            log.info("장바구니 목록 삭제중 오류가 발생하였습니다.");
            throw new CustomException(e.getMessage());
        }
    }
}
