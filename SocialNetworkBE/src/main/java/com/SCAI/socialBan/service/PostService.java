package com.SCAI.socialBan.service;

import java.util.List;

import com.SCAI.socialBan.model.Post;
import com.SCAI.socialBan.model.User;

public interface PostService {

	public Post createPost(Post post, User user);
	public Post findPostById(Long id) throws Exception;
	public void deletePost(Long id, String jwt) throws Exception;
	public Post updatePost(Post post, Long id, String jwt) throws Exception;
	public List<Post> findAllPost();
	public Post likePost(Long postId, User user) throws Exception;
	public Post commentPost(Long postId,User user, String content) throws Exception;

}
