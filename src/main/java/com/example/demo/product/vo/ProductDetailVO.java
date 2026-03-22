package com.example.demo.product.vo;

import lombok.Data;

@Data
public class ProductDetailVO {

    private Long idx;
    private ProductVO product;
    private String title;
    private String content;
    private String detailImage1;
    private String detailImage2;
    private String detailImage3;
}
