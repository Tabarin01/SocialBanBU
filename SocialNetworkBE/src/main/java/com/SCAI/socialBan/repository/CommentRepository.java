package com.SCAI.socialBan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SCAI.socialBan.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{
    
}
