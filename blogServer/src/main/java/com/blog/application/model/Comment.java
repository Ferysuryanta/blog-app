package com.blog.application.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "tbl_comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private Date createdAt;
    private String postedBy;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
}
