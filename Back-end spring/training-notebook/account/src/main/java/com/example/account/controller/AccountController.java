package com.example.account.controller;


import com.example.account.dto.UserDetailsResponse;
import com.example.account.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@Controller
@AllArgsConstructor
@RequestMapping("/account")
public class AccountController {
    private final AccountService accountService;


    @GetMapping("/user")
    public ResponseEntity<UserDetailsResponse> getUser(Principal principal) {
        UserDetailsResponse userDetailsResponse = accountService.getUserService(principal.getName());
        if (userDetailsResponse != null) {
            return ResponseEntity.ok(userDetailsResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/user/id")
    public ResponseEntity<String> getUserId(Principal principal) {
        String userId = accountService.getUserId(principal.getName());
        if (userId != null) {
            return ResponseEntity.ok(userId);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/user/email")
    public ResponseEntity<String> updateUserEmail(Principal principal, @RequestBody String newEmail) {
        boolean success = accountService.updateEmail(principal.getName(), newEmail);
        if (success) {
            return ResponseEntity.ok("Email updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to update email.");
        }
    }

    @PutMapping("/user/firstname")
    public ResponseEntity<String> updateUserFirstName(Principal principal, @RequestBody String newFirstName) {
        boolean success = accountService.updateFirstName(principal.getName(), newFirstName);
        if (success) {
            return ResponseEntity.ok("First name updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to update first name.");
        }
    }

    @PutMapping("/user/lastname")
    public ResponseEntity<String> updateUserLastName(Principal principal, @RequestBody String newLastName) {
        boolean success = accountService.updateLastName(principal.getName(), newLastName);
        if (success) {
            return ResponseEntity.ok("Last name updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to update last name.");
        }
    }

    @PutMapping("/user/username")
    public ResponseEntity<String> updateUserUsername(Principal principal, @RequestBody String newUsername) {
        boolean success = accountService.updateUsername(principal.getName(), newUsername);
        if (success) {
            return ResponseEntity.ok("Username updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to update username.");
        }
    }

}
