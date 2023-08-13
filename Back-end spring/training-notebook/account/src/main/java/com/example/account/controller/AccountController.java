package com.example.account.controller;


import com.example.account.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

@RestController
@AllArgsConstructor
@RequestMapping("/account")
public class AccountController {

    private final JdbcTemplate jdbcTemplate;
    private final AccountService accountService;

    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getUser(Principal principal) {
        return accountService.getUserService(principal.getName());
    }

}