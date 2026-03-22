package com.example.demo.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product_image")
@Getter@Setter
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "main_image")
    private String mainImage;

    @Column(name = "thumnail1")
    private String thumnail1;

    @Column(name = "thumnail2")
    private String thumnail2;
}
