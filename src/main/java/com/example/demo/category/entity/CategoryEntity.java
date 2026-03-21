package com.example.demo.category.entity;

import com.example.demo.category.vo.CategoryVO;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category_code")
@Getter@Setter@AllArgsConstructor@NoArgsConstructor
public class CategoryEntity {
    @Id
    @Column(name = "code_id")
    private String codeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private CategoryEntity parent;

    @Column(name = "code_name")
    private String codeName;

    @OneToMany(mappedBy = "parent")
    private List<CategoryEntity> children = new ArrayList<>();

    private String depth;

}
