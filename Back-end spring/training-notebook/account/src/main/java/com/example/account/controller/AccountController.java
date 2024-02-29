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
        return userDetailsResponse != null ? ResponseEntity.ok(userDetailsResponse) : ResponseEntity.notFound().build();
    }

    @GetMapping("/user/id")
    public ResponseEntity<String> getUserId(Principal principal) {
        String userId = accountService.getUserId(principal.getName());
        return userId != null ? ResponseEntity.ok(userId) : ResponseEntity.notFound().build();
    }

    @PutMapping("/user/{attribute}")
    public ResponseEntity<String> updateUserAttribute(Principal principal, @PathVariable String attribute, @RequestBody String newValue) {
        boolean success = accountService.updateAttribute(principal.getName(), attribute, newValue);
        return success ? ResponseEntity.ok(attribute + " updated successfully.") : ResponseEntity.badRequest().body("Failed to update " + attribute + ".");
    }
}
