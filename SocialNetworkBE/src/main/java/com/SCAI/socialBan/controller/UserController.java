package com.SCAI.socialBan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SCAI.socialBan.model.User;
import com.SCAI.socialBan.repository.UserRepository;
import com.SCAI.socialBan.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/profile")
	public User findUserByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserByJwt(jwt);
		return user;
	}

	@GetMapping("/allUsers")
	public List<User> getAllUser() throws Exception {
		List<User> users = userService.findAllUser();

		return users;
	}

	@PutMapping("/editProfile")
	public User updateUser(@RequestHeader("Authorization") String jwt, @RequestBody User user) throws Exception {

		User updatedUser = userRepository.findByEmail(user.getEmail());

		if (!userService.verificationUser(updatedUser, jwt)) {
			throw new Exception("Utente non autorizzato a modificare il profilo utente con email " + user.getEmail());
		}

		return userService.updateUser(updatedUser, user, jwt);
	}

	// @PostMapping("/users")
	// public User createUser(@RequestBody User user) throws Exception {
	// User userExists = userRepository.findByEmail(user.getEmail());
	// if(userExists != null) {
	// throw new Exception("Email already used : " + userExists.getEmail());
	// }

	// User savedUser = userRepository.save(user);

	// return savedUser;
	// }

	// @DeleteMapping("/users/{userId}")
	// public String deleteUser(@PathVariable Long userId) throws Exception {
	//
	// userRepository.deleteById(userId);
	//
	// return "User deleted successfully";
	// }
	//
	// @GetMapping("/users")
	// public List<User> getAllUser() throws Exception {

	// List<User> users = userRepository.findAll();

	// return users;
	// }

	// @GetMapping
	// public User findUserByEmail(String email) throws Exception {
	// User user = userRepository.findByEmail(email);
	// if(user == null) {
	// throw new Exception("User not found with email " + email);
	// }
	//
	// return user;
	// }
}
