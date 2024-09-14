package com.blog.application.service;

import com.blog.application.model.Comment;

import java.util.List;

public interface CommentService {
    Comment createComment(Long postId, String postedBy, String content);
    List<Comment> getCommentsByPostId(Long postId);
}
