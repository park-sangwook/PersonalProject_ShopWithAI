package com.example.demo.product.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.web.bind.annotation.BindParam;

import java.util.Date;
import java.util.UUID;

@Data
public class ReviewVO {
    private Long idx;
    @JsonProperty("product_id")
    private Long productId;

    @JsonProperty("user_id")
    @BindParam("user_id")
    private Long userId;


    private long reviewCount;

    private String content;
    private String image;
    private Date createAt;
    private Date updateAt;
    private double rating;
    private UUID uuidName;


    public void setUser_id(Long userId){
        this.userId = userId;
    }
}
