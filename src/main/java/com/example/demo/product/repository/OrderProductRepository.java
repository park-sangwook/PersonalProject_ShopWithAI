package com.example.demo.product.repository;

import com.example.demo.product.entity.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct,Long>, QuerydslPredicateExecutor<OrderProduct> {
}
