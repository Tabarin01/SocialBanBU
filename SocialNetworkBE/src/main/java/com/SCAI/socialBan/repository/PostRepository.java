package com.SCAI.socialBan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SCAI.socialBan.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

    public Post findByTitle(String title) throws Exception;


}
