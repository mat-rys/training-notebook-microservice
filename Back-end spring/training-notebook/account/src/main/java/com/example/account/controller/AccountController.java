package com.example.account.controller;


import lombok.AllArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getUsers() {
        try {
            List<Map<String, Object>> users = jdbcTemplate.queryForList("SELECT * FROM user_entity");
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            // Obsłuż wyjątek w odpowiedni sposób
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getUser(Principal principal) {
        try {
            Map<String, Object> user = jdbcTemplate.queryForMap("SELECT * FROM user_entity WHERE id = \'"+ principal.getName()+ "\'");
            return ResponseEntity.ok(user);
        } catch (EmptyResultDataAccessException e) {
            // Obsłuż brak wyników
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            // Obsłuż inny wyjątek w odpowiedni sposób
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}