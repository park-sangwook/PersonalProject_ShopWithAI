package com.example.demo.product.entity;
import com.example.demo.category.entity.CategoryEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "product")
@Getter @Setter
@NoArgsConstructor
@DynamicUpdate
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // 상품명

    @Column(columnDefinition = "TEXT")
    private String detail; // 상품 상세 설명

    private Integer price; // 가격

    @Column(name = "review_count")
    private long reviewCount; // 리뷰 카운트

    private Double rating; // 평점

    private String colors; // 블랙,화이트...
    private String sizes;  // M,L,XL...

    @Column(name = "created_at", updatable = false)
    private Date createdAt;

    // 대분류 카테고리와의 연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_l", referencedColumnName = "code_id")
    @JsonIgnore
    private CategoryEntity categoryLarge;

    // 소분류 카테고리와의 연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_s", referencedColumnName = "code_id")
    @JsonIgnore
    private CategoryEntity categorySmall;

    @Column(name = "new_arrivals")
    private String newArrivals;

    @OneToMany(mappedBy = "product")
    private List<CartItem> cartItems = new ArrayList<>();

    @JsonIgnore
    @OneToOne(mappedBy = "product")
    private ProductDetail productDetail;

    @OneToOne(mappedBy = "product")
    private ReviewEntity review;

    @OneToOne(mappedBy = "product")
    private OrderProduct order;

}