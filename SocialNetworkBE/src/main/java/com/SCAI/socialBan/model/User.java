package com.SCAI.socialBan.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class User {

	public enum Role {
        ADMIN,
        GUEST
	}

	@Id
	@GeneratedValue (strategy = GenerationType.AUTO)
	private Long id;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	private String email;
	private String fullName;
	private String dob;
	private String imgProfile;

	@Enumerated(EnumType.STRING)
	private Role role;
}
