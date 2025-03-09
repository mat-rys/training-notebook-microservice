package com.example.account.controller;

import com.example.account.dto.Session;
import com.example.account.service.KeycloakService;
import jakarta.annotation.security.RolesAllowed;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@Controller
@AllArgsConstructor
@RequestMapping("/account/admin")
public class AdminController {

    private final KeycloakService keycloakService;

    @GetMapping("/user/sessions")
    @RolesAllowed("ROLE_admin")
    public ResponseEntity<List<Session>> getAllUserSessions() {
        try {
            List<Session> sessions = keycloakService.getAllUserSessions();
            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonList(new Session())); // Zwracanie pustego obiektu w razie błędu
        }
    }

    @DeleteMapping("/session/{sessionId}")
    @RolesAllowed("ROLE_admin")
    public ResponseEntity<Void> deleteSession(@PathVariable String sessionId) {
        try {
            keycloakService.deleteUserSession(sessionId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/user/{userId}/status")
    @RolesAllowed("ROLE_admin")
    public ResponseEntity<Void> updateUserStatus(@PathVariable String userId, @RequestParam boolean enabled) {
        try {
            keycloakService.updateUserStatus(userId, enabled);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

