package com.example.demo.product.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "product_detail")
@Getter
public class ProductDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "detail_image1")
    private String detailImage1;

    @Column(name = "detail_image2")
    private String detailImage2;

    @Column(name = "detail_image3")
    private String detailImage3;
}
