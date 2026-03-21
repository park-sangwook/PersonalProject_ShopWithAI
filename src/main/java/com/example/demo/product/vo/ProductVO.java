package com.example.demo.product.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductVO {
    private Long id;             // 상품 고유 번호 (int(11))
    private String categoryL;       // 대분류
    private String categoryS;       // 소분류
    private String name;            // 상품명
    private String detail;          // 상품 상세 설명 (text)
    private Integer price;       // 판매 가격 (decimal(10,0))
    private Double rating;      // 평점 (decimal(2,1))

    // DB의 쉼표 구분 문자열을 리스트로 다루기 위한 필드
    private String colors;          // 색상 옵션 (블랙,화이트,네이비)
    private String sizes;
    private Date createdAt;
}
