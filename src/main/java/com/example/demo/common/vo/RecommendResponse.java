package com.example.demo.common.vo;

import lombok.Data;

import java.util.List;

@Data
public class RecommendResponse {
    private int input_item;
    private List<Long> recommendations;
}