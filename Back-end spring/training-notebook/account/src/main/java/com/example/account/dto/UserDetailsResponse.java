package com.example.account.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailsResponse {
    private String email;
    private String firstName;
    private String lastName;
    private String username;
    private boolean emailVerified;
}