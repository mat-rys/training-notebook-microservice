package com.example.account.controller;


import com.example.account.service.AccountService;
import jakarta.annotation.security.RolesAllowed;
import lombok.AllArgsConstructor;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.common.util.KeycloakUriBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

@RestController
@AllArgsConstructor
@RequestMapping("/account")
public class AccountController {

    private final JdbcTemplate jdbcTemplate;
    private final AccountService accountService;

    @RolesAllowed("user")
    @CrossOrigin(origins = "http://localhost:4200") // Adres Twojej aplikacji Angular
    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getUser(Principal principal) {
        return accountService.getUserService(principal.getName());
    }
}
