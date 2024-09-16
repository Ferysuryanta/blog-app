package com.blog.application.service;

import com.blog.application.model.Post;

import java.util.List;

public interface PostService {
    Post savePost(Post post);
    List<Post> getAllPosts();
    Post getPostById(Long postId);
    List<Post> searchByName(String name);
    void likePost (Long postId);
}
