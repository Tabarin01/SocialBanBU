package com.SCAI.socialBan.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SCAI.socialBan.configuration.JwtProvider;
import com.SCAI.socialBan.model.User;
import com.SCAI.socialBan.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtProvider jwtProvider;

	@Override
	public User findUserById(Long userId) throws Exception {
		Optional<User> opt = userRepository.findById(userId);

		if (opt.isPresent()) {
			return opt.get();
		} else
			throw new Exception("User not found with id " + userId);
	}

	@Override
	public User findUserByJwt(String jwt) throws Exception {

		String email = jwtProvider.getEmailFromJwtToken(jwt);

		if (email == null) {
			throw new Exception("Provide a valid jwt token");
		}

		User user = userRepository.findByEmail(email);

		if (user == null) {
			throw new Exception("User not found with email " + email);
		}

		return user;
	}

	@Override
	public User updateUser(User user, User newUser, String jwt) throws Exception {

		User oldUser = findUserByJwt(jwt);

		if (!verificationUser(user, jwt)) {
			throw new Exception("User not authorized");
		}

		oldUser.setId(oldUser.getId());

		if (newUser.getFullName() != null) {
			oldUser.setFullName(newUser.getFullName());
		}

		if (newUser.getImgProfile() != null) {

			oldUser.setImgProfile(newUser.getImgProfile());
		}

		return userRepository.save(oldUser);
	}

	@Override
	public boolean verificationUser(User user, String jwt) throws Exception {

		User userValidated = findUserByJwt(jwt);
		User userChecker = findUserById(user.getId());

		if (!userValidated.equals(userChecker)) {
			return false;
		}
		;

		return true;
	}

	@Override
	public List<User> findAllUser() {
		return userRepository.findAll();
	}

	


}
