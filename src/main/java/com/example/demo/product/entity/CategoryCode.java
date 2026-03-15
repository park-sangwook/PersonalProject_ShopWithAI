package com.example.demo.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category_code")
@Getter @Setter
@NoArgsConstructor
public class CategoryCode {

    @Id
    @Column(name = "code_id", length = 10)
    private String codeId; // 예: CTG_1000

    @Column(name = "code_name", nullable = false, length = 50)
    private String codeName; // 예: 상의, 셔츠

    @Column(name = "depth")
    private Integer depth; // 1: 대분류, 2: 소분류

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private CategoryCode parent; // 상위 카테고리

    @OneToMany(mappedBy = "parent")
    private List<CategoryCode> children = new ArrayList<>();
}