package com.SCAI.socialBan.service;

import java.util.List;

import com.SCAI.socialBan.model.User;

public interface UserService {

	public User findUserById(Long userId) throws Exception;

	public User findUserByJwt(String jwt) throws Exception;

	public User updateUser(User user,User newUser, String jwt) throws Exception;

	public boolean verificationUser(User user, String jwt) throws Exception;

	public List<User> findAllUser();


}
