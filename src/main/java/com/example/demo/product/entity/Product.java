package com.example.demo.product.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product")
@Getter @Setter
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // 상품명

    @Column(columnDefinition = "TEXT")
    private String detail; // 상품 상세 설명

    @Column(precision = 10, scale = 0)
    private BigDecimal price; // 가격

    @Column(precision = 2, scale = 1)
    private BigDecimal rating; // 평점

    private String colors; // 블랙,화이트...
    private String sizes;  // M,L,XL...

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // 대분류 카테고리와의 연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_l", referencedColumnName = "code_id")
    @JsonIgnore
    private CategoryCode categoryLarge;

    // 소분류 카테고리와의 연관관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_s", referencedColumnName = "code_id")
    @JsonIgnore
    private CategoryCode categorySmall;
}