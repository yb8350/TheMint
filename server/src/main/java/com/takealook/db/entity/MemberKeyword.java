package com.takealook.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class MemberKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long seq;
    Long memberSeq;
    String keywordName;
}