package com.example.demo.product.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductStatsVO {
    private long productId;
    private long reviewCount;
    private double rating;
}
