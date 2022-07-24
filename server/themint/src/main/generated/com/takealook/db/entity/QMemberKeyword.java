package com.takealook.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QMemberKeyword is a Querydsl query type for MemberKeyword
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberKeyword extends EntityPathBase<MemberKeyword> {

    private static final long serialVersionUID = 1754095794L;

    public static final QMemberKeyword memberKeyword = new QMemberKeyword("memberKeyword");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath keywordName = createString("keywordName");

    public final NumberPath<Integer> memberSeq = createNumber("memberSeq", Integer.class);

    public QMemberKeyword(String variable) {
        super(MemberKeyword.class, forVariable(variable));
    }

    public QMemberKeyword(Path<? extends MemberKeyword> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMemberKeyword(PathMetadata metadata) {
        super(MemberKeyword.class, metadata);
    }

}

