package com.example.demo.product.entity;

import com.example.demo.product.vo.ProductVO;
import com.example.demo.user.service.PrincipalDetails;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;

@Entity
@Table(name = "order_product")
@Getter@Builder@AllArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "order_no")
    private String orderNo;

    @Column(name = "user_id")
    private String userId;

    private String size;

    private String color;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(columnDefinition = "varchar(20) default '배송중'")
    private String status;

}
