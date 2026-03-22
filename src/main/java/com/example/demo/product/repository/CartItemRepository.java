package com.example.demo.product.repository;

import com.example.demo.product.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Long>, QuerydslPredicateExecutor<CartItem> {
    void deleteByProductId(Long productId);
}
