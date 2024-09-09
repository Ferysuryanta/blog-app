package com.blog.application.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "tbl_post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 5000)
    private String content;

    private String postedBy;

    private String img;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    private int likeCount;

    private int viewCount;

    @ElementCollection
    private List<String> tags;

}
