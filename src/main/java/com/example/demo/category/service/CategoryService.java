package com.example.demo.category.service;

import com.example.demo.category.entity.QCategoryEntity;
import com.example.demo.category.repository.CategoryRepository;
import com.example.demo.category.vo.CategoryVO;
import com.example.demo.common.vo.CustomException;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final QCategoryEntity category = QCategoryEntity.categoryEntity;
    private final JPAQueryFactory queryFactory;
    private final CategoryRepository categoryRepository;

    /**
     * 카테고리 대분류 조회하는 서비스
     * @author : 박상욱
     * @return : 카테고리 대분류
     */
    @Transactional(readOnly = true)
    public List<CategoryVO> selectCategoryL(){
        List<CategoryVO> cte = queryFactory.select(Projections.constructor(CategoryVO.class,category.codeId,category.parent.codeId,category.codeName,category.depth))
                .from(category).where(category.depth.eq("1")).fetch();
        if(cte.isEmpty())throw new CustomException("대분류가 없습니다.");
        return cte;
    }
}
