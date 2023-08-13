package com.example.account.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
@AllArgsConstructor
@Slf4j
public class AccountService {

    private final JdbcTemplate jdbcTemplate;

    public ResponseEntity<Map<String, Object>> getUserService(String idKeycloak) {
        try {
            log.info("Fetching user with ID: {}", idKeycloak);
            Map<String, Object> user = jdbcTemplate.queryForMap("SELECT * FROM user_entity WHERE id = ?", idKeycloak);
            log.info("User retrieved successfully: {}", user);
            return ResponseEntity.ok(user);
        } catch (EmptyResultDataAccessException e) {
            log.warn("User with ID {} not found", idKeycloak);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("An error occurred while fetching user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
