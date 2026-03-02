package com.example.demo.common.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class QueryDSLConfig {

    @PersistenceContext
    private final EntityManager entityManager;

    @Bean
    private JPAQueryFactory queryFactory(){
        return new JPAQueryFactory(entityManager);
    }
}
