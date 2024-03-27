package com.SCAI.socialBan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SCAI.socialBan.model.Comment;
import com.SCAI.socialBan.model.Post;
import com.SCAI.socialBan.model.User;
import com.SCAI.socialBan.service.PostService;
import com.SCAI.socialBan.service.UserService;

@RestController
@RequestMapping("api/post")
public class PostController {

	@Autowired
	private PostService postService;

	@Autowired
	private UserService userService;

	@PostMapping("")
	public Post createPost(@RequestBody Post post, @RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserByJwt(jwt);
		Post createdPost = postService.createPost(post, user);

		return createdPost;
	}

	@GetMapping("")
	public List<Post> getAllPost() throws Exception {
		List<Post> posts = postService.findAllPost();

		return posts;
	}

	@DeleteMapping("/{postId}")
	public String deletePost(@PathVariable Long postId, @RequestHeader("Authorization") String jwt) throws Exception {
		postService.deletePost(postId, jwt);

		return "Post deleted successfully";

	}

	@PutMapping("/{id}")
	public Post updatePost(@RequestBody Post post, @PathVariable Long id, @RequestHeader("Authorization") String jwt)
			throws Exception {

		Post updatedPost = postService.updatePost(post, id, jwt);
		return updatedPost;
	}

	@PutMapping("/{id}/like")
	public Post likePost(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserByJwt(jwt);

		Post updatedPost = postService.likePost(id, user);
		return updatedPost;
	}

	@PutMapping("/{id}/comment")
	public Post commentPost(@PathVariable Long id, @RequestHeader("Authorization") String jwt,
			@RequestBody Comment comment) throws Exception {
		User user = userService.findUserByJwt(jwt);

		Post updatePost = postService.commentPost(id, user, comment.getText());

		return updatePost;
	}

}
