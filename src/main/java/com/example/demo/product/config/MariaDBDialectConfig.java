package com.example.demo.product.config;

import org.hibernate.boot.model.FunctionContributions;
import org.hibernate.boot.model.FunctionContributor;
import org.hibernate.dialect.MariaDBDialect;
import org.hibernate.type.StandardBasicTypes;

public class MariaDBDialectConfig implements FunctionContributor {

    /**
     * src/main/resources/META-INF/services/org.hibernate.boot.model.FunctionContributor
     * Query-dsl로 full-scan index 만드는 방법
     * -- 1. 기존 테이블에 FULLTEXT 인덱스 추가 (ngram 파서 사용)
     * -- ngram은 '청자켓'을 '청자', '자켓' 등으로 쪼개서 저장해주는 한글 필수 옵션입니다.
     * ALTER TABLE product ADD FULLTEXT INDEX idx_product_name (name) WITH PARSER ngram;
     *
     * -- 2. 인덱스가 잘 생성되었는지 확인
     * SHOW INDEX FROM product;
     *
     *
     * -- 실행 계획 확인
     * EXPLAIN SELECT * FROM product
     * WHERE MATCH(name) AGAINST('+청자켓*' IN BOOLEAN MODE);
     */
    @Override
    public void contributeFunctions(FunctionContributions functionContributions) {
        functionContributions.getFunctionRegistry().registerPattern("match_against","MATCH({0}) AGAINST({1} IN BOOLEAN MODE)"
        ,functionContributions.getTypeConfiguration().getBasicTypeRegistry().resolve(StandardBasicTypes.DOUBLE));
    }
}
