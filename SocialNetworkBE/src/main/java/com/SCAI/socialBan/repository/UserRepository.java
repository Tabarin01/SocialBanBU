package com.SCAI.socialBan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SCAI.socialBan.model.User;
import com.SCAI.socialBan.model.User.Role;

public interface UserRepository extends JpaRepository<User, Long>{
	
	public User findByEmail(String email);

	public boolean existsByRole(Role role);
}
