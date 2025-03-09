package com.example.account.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserForAdminDetailsResponse {
    private String userId; // Nowe pole na ID użytkownika
    private String email;
    private String firstName;
    private String lastName;
    private String username;
    private boolean enabled;
}
