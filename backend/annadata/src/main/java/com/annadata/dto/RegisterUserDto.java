package com.annadata.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.annadata.valueobject.DonationStatus;
import com.annadata.valueobject.FoodCategory;
import com.annadata.valueobject.FoodType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor // This is crucial for builder to work with all fields
@NoArgsConstructor  // Good to have, especially for Jackson or frameworks

public class RegisterUserDto {
	
//	private UUID id;
	private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	private String email;
	private String password;
	private String phoneNumber;
	
}
