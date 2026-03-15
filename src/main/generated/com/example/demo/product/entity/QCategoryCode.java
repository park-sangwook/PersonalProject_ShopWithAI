package com.example.demo.product.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCategoryCode is a Querydsl query type for CategoryCode
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCategoryCode extends EntityPathBase<CategoryCode> {

    private static final long serialVersionUID = -37973731L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCategoryCode categoryCode = new QCategoryCode("categoryCode");

    public final ListPath<CategoryCode, QCategoryCode> children = this.<CategoryCode, QCategoryCode>createList("children", CategoryCode.class, QCategoryCode.class, PathInits.DIRECT2);

    public final StringPath codeId = createString("codeId");

    public final StringPath codeName = createString("codeName");

    public final NumberPath<Integer> depth = createNumber("depth", Integer.class);

    public final QCategoryCode parent;

    public QCategoryCode(String variable) {
        this(CategoryCode.class, forVariable(variable), INITS);
    }

    public QCategoryCode(Path<? extends CategoryCode> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCategoryCode(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCategoryCode(PathMetadata metadata, PathInits inits) {
        this(CategoryCode.class, metadata, inits);
    }

    public QCategoryCode(Class<? extends CategoryCode> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.parent = inits.isInitialized("parent") ? new QCategoryCode(forProperty("parent"), inits.get("parent")) : null;
    }

}

