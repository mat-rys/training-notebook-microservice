package com.example.account.account.controller;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
	@NotBlank(message = "Nie podano adresu e-mail")
	private String login;
	
	@NotNull(message = "Nie podano hasła")
	private String password;
}
