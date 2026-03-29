package com.example.demo.product.vo;

import lombok.Data;

@Data
public class CartItemVO {
    private Long idx;
    private String userId;
    private ProductImageVO product;
    private String color;
    private String size;
}
