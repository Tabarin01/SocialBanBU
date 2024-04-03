package com.SCAI.socialBan.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.SCAI.socialBan.model.Comment;
import com.SCAI.socialBan.model.Post;
import com.SCAI.socialBan.model.User;
import com.SCAI.socialBan.repository.CommentRepository;
import com.SCAI.socialBan.repository.PostRepository;

@Service
public class PostServiceImplementation implements PostService {

	// Provided dependency from post repository and userService
	@Autowired
	private PostRepository postRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private CommentRepository commentRepository;

	// ------------------------------------------------------

	// Methods

	// CREATION POST

	@Override
	public Post createPost(Post post, User user) {

		Post createdPost = new Post();
		createdPost.setTitle(post.getTitle());
		createdPost.setImage(post.getImage());
		createdPost.setDescription(post.getDescription());
		createdPost.setUser(user);
		createdPost.setCreatedAt(LocalDateTime.now());
		createdPost.setComments(new ArrayList<>());

		return postRepository.save(createdPost);
	}

	// SEARCHING POST

	@Override
	public Post findPostById(Long id) throws Exception {
		Optional<Post> opt = postRepository.findById(id);

		if (opt.isPresent()) {
			return opt.get();
		}

		throw new Exception("post not found with id " + id);

	}

	@Override
	public List<Post> findAllPost() {
		return postRepository.findAll();
	}

	@Override
	public List<Post> findAllPostByUserId(Long userId) throws Exception {

		List<Post> listaPost = new ArrayList<>();
		List<Post> allPosts = postRepository.findAll();

		for (Post post : allPosts) {
			if (post.getUser().getId() == userId) {
				listaPost.add(post);
			}
		}

		return listaPost;
	}
	

	// DELETE POSTS

	@Override
	public void deletePost(Long id, String jwt) throws Exception {
		// Il metodo di deleteById(id) se lo trova lo elimina altrimenti ignora,
		// perciò non dovrebbe servire il find.
		// findPostById(id);
		Post post = findPostById(id);
		User postOwner = userService.findUserById(post.getUser().getId());
		if (!userService.verificationUser(postOwner, jwt)) {
			throw new Exception("Utente non autorizzato all'eliminazione ");
		}

		postRepository.deleteById(id);
	}

	@Override
	public void deletePostByUserId(Long userId, String jwt) throws Exception {

		List<Post> listaPostUser = findAllPostByUserId(userId);

		User user = userService.findUserById(userId);

		for (Post post : listaPostUser) {
			deletePost(post.getId(), jwt);
		}

		userService.deleteUser(user, jwt);
	}

	@Transactional
	public void deleteUserComments(Long userId, String jwt) throws Exception {
		List<Post> allPosts = findAllPost();

		for (Post post : allPosts) {
			Iterator<Comment> iterator = post.getComments().iterator();
			while (iterator.hasNext()) {
				Comment comment = iterator.next();
				if (comment.getUser().getId().equals(userId)) {
					iterator.remove(); // Rimuovi il commento dalla lista del post
					commentRepository.deleteById(comment.getId()); // Elimina il commento dal database
				}
			}
		}
	}

	public void deleteUserLikes(Long userId, String jwt) throws Exception{

		List<Post> allPosts = findAllPost();

		for(Post post: allPosts){
			
		}


	}

	// UPDATE POST

	@Override
	public Post updatePost(Post post, Long id, String jwt) throws Exception {

		// old post to update
		Post oldPost = findPostById(id);
		User userPostOwner = userService.findUserById(oldPost.getUser().getId());

		if (!userService.verificationUser(userPostOwner, jwt)) {
			throw new Exception("Utente non autorizzato alla modifica ");
			// + "USER PROPRIETARIO "
			// + userPostOwner.getFullName() + " | "
			// + userPostOwner.getId() + " | "
			// + userPostOwner.getEmail()
			// + "USER MODIFICANTE "
			// + userPostEditing.getFullName() + " | "
			// + userPostEditing.getId() + " | "
			// + userPostEditing.getEmail());
		}

		// updating all post attributes
		if (post.getTitle() != null) {
			oldPost.setTitle(post.getTitle());
		}

		if (post.getImage() != null) {
			oldPost.setImage(post.getImage());
		}

		if (post.getDescription() != null) {
			oldPost.setDescription(post.getDescription());
		}

		return postRepository.save(oldPost);
	}

	@Override
	public Post likePost(Long postId, User user) throws Exception {
		Post post = findPostById(postId);

		// se la lista di likes contiene l'id dello user, lo rimuove, altrimenti lo
		// aggiunge
		if (post.getLikes().contains(user.getId())) {
			post.getLikes().remove(user.getId());
		} else {
			post.getLikes().add(user.getId());
		}
		return postRepository.save(post);
	}

	@Override
	public Post commentPost(Long postId, User user, String content) throws Exception {
		Post post = findPostById(postId);

		if (post == null) {
			throw new Exception("Post Id not valid, post not found " + postId);
		}

		Comment comment = new Comment();
		comment.setPostId(postId);
		comment.setUser(user);
		comment.setText(content);
		comment.setCreatedAt(LocalDateTime.now());

		post.getComments().add(comment);

		return postRepository.save(post);
	}

}
