package com.example.demo.product.vo;

import com.example.demo.product.entity.OrderProduct;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderProductVO {
    private long id;

    @JsonProperty("product_id")
    private long productId;

    private String orderNo;

    private String userId;
    private String size;
    private String color;
    private LocalDateTime createdAt;

    public void setId(Long id){
        this.productId = id;
    }
}
