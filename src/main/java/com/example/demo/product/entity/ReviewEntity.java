package com.example.demo.product.entity;

import com.example.demo.product.vo.ReviewVO;
import com.example.demo.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "review")
@DynamicInsert
@Getter@AllArgsConstructor@Builder
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String content;

    private double rating;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    private String image;

    @Column(columnDefinition = "BINARY(16)",name = "uuid_name")
    private UUID uuidName;

    public static ReviewEntity toEntity(ReviewVO vo, Product product, UserEntity user){
        return ReviewEntity.builder().content(vo.getContent()).image(vo.getImage())
                .product(product).user(user).rating(vo.getRating()).build();
    }
}
