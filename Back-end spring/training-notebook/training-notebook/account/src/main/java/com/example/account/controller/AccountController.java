package com.example.account.controller;


import com.example.account.dto.UserDetailsResponse;
import com.example.account.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.security.Principal;
import java.util.*;

@RestController
@Controller
@AllArgsConstructor
@RequestMapping("/account")
public class AccountController {

    private final JdbcTemplate jdbcTemplate;
    private final AccountService accountService;



    @PostMapping("/get-token")
    public ResponseEntity<String> getToken() {
        String keycloakUrl = "http://localhost:8191/auth/realms/training-notebook-microservice-realm/protocol/openid-connect/token";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("username", "ttt");
        requestBody.add("password", "ttt");
        requestBody.add("grant_type", "password");
        requestBody.add("client_id", "backend");
        requestBody.add("client_secret", "6aiXmUIE27BIMVUerHBVNCUTJs4ascMS");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(keycloakUrl, requestEntity, String.class);

        return response;
    }

    @GetMapping("/user")
    public ResponseEntity<UserDetailsResponse> getUser(Principal principal) {
        UserDetailsResponse userDetailsResponse = accountService.getUserService(principal.getName());
        if (userDetailsResponse != null) {
            return ResponseEntity.ok(userDetailsResponse);
        } else {
            return ResponseEntity.notFound().build(); // Lub odpowiedź błędu w zależności od Twojego przypadku użycia.
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

    @PostMapping("/user/firstname")
    public ResponseEntity<String> updateUserFirstName(Principal principal, @RequestBody String newFirstName) {
        boolean success = accountService.updateFirstName(principal.getName(), newFirstName);
        if (success) {
            return ResponseEntity.ok("First name updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to update first name.");
        }
    }

    @PostMapping("/user/lastname")
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
