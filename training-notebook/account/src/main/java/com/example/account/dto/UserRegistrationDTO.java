package com.example.account.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {

    @NotBlank(message = "First name is required.")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters.")
    private String firstName;

    @NotBlank(message = "Last name is required.")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters.")
    private String lastName;

    @NotBlank(message = "Email is required.")
    @Email(message = "Invalid email format.")
    private String email;

    @NotBlank(message = "Username is required.")
    @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters.")
    private String username;

    private boolean enabled;

    @Size(min = 1, message = "At least one credential is required.")
    private List<CredentialDTO> credentials;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CredentialDTO {
        @NotBlank(message = "Credential type is required.")
        private String type;

        @NotBlank(message = "Credential value is required.")
        @Size(min = 8, message = "Password must be at least 8 characters long.")
        private String value;

        private boolean temporary;
    }
}

