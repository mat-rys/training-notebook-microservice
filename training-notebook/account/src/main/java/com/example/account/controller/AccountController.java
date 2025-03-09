package com.example.account.controller;



import com.example.account.dto.UserDetailsResponse;
import com.example.account.dto.UserForAdminDetailsResponse;
import com.example.account.service.AccountService;
import com.example.account.service.KeycloakService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;


@RestController
@Controller
@AllArgsConstructor
@RequestMapping("/account")
public class AccountController {
    private final AccountService accountService;
    private final JdbcTemplate jdbcTemplate;
    private final RestTemplate restTemplate;
    private final KeycloakService keycloakService;
    private static final String TOKEN_URL = "http://localhost:8191/auth/realms/training-notebook-microservice-realm/protocol/openid-connect/token";

    @DeleteMapping("/users/sessions")
    @RolesAllowed("ROLE_default-roles-training-notebook-microservice-realm")
    public ResponseEntity<Void> deleteAllUserSessions(Principal principal) {
        try {
            keycloakService.deleteAllUserSessions(principal.getName());
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/user")
    @RolesAllowed("ROLE_default-roles-training-notebook-microservice-realm")
    public ResponseEntity<UserDetailsResponse> getUser(Principal principal) {
        UserDetailsResponse userDetailsResponse = accountService.getUserService(principal.getName());
        return userDetailsResponse != null ? ResponseEntity.ok(userDetailsResponse) : ResponseEntity.notFound().build();
    }

    @GetMapping("/user/id")
    @RolesAllowed("ROLE_default-roles-training-notebook-microservice-realm")
    public ResponseEntity<String> getUserId(Principal principal) {
        String userId = accountService.getUserId(principal.getName());
        return userId != null ? ResponseEntity.ok(userId) : ResponseEntity.notFound().build();
    }

    @PutMapping("/user/{attribute}")
    @RolesAllowed("ROLE_default-roles-training-notebook-microservice-realm")
    public ResponseEntity<Map<String, String>> updateUserAttribute(Principal principal, @PathVariable String attribute, @RequestBody String newValue) {
        boolean success = accountService.updateAttribute(principal.getName(), attribute, newValue);

        Map<String, String> response = new HashMap<>();
        if (success) {
            response.put("message", attribute + " updated successfully.");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Failed to update " + attribute + ".");
            return ResponseEntity.badRequest().body(response);
        }
    }



    @GetMapping("/users")
    @RolesAllowed("ROLE_admin")
    public ResponseEntity<List<UserForAdminDetailsResponse>> getAllUsers() {
        List<UserForAdminDetailsResponse> users = accountService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/user/{id}")
    @RolesAllowed("ROLE_admin")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        boolean success = accountService.deleteUser(id);
        return success ? ResponseEntity.ok("User deleted successfully.") : ResponseEntity.badRequest().body("Failed to delete user.");
    }

    @PostMapping("/get-token")
    @RolesAllowed("ROLE_admin")
    public ResponseEntity<String> getToken(@RequestParam String username,
                                           @RequestParam String password,
                                           @RequestParam String grantType,
                                           @RequestParam String clientId,
                                           @RequestParam String clientSecret) {

        // Przygotowanie danych do zapytania (x-www-form-urlencoded)
        String body = "grant_type=" + grantType + "&username=" + username + "&password=" + password +
                "&client_id=" + clientId + "&client_secret=" + clientSecret;

        // Przygotowanie nagłówków zapytania
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded");
        System.out.println("Request headers: " + headers);

        // Tworzenie zapytania HTTP POST
        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        try {
            // Wysłanie zapytania do Keycloak
            ResponseEntity<String> response = restTemplate.exchange(TOKEN_URL, HttpMethod.POST, entity, String.class);

            // Zwrócenie odpowiedzi z tokenem
            return response;
        } catch (Exception e) {
            // Obsługa błędów
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to fetch token: " + e.getMessage());
        }
    }













    //////////////////////////
    @GetMapping("/tables")
    public ResponseEntity<?> getAllTables() {
        try {
            // Pobranie listy tabel z schematu 'public'
            String query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';";
            List<String> tables = jdbcTemplate.queryForList(query, String.class);
            return ResponseEntity.ok(tables);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @GetMapping("/columns/{tableName}")
    public ResponseEntity<?> getColumns(@PathVariable String tableName) {
        try {
            // Zapytanie dla PostgreSQL, aby pobrać kolumny w tabeli
            String query = "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = ?";

            // Pobierz szczegóły kolumn dla konkretnej tabeli
            List<Map<String, Object>> columns = jdbcTemplate.queryForList(query, tableName);

            return ResponseEntity.ok(columns);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/users/all")
    public ResponseEntity<List<Map<String, Object>>> getAllUsersWithFullDetails() {
        try {
            List<Map<String, Object>> users = accountService.getAllUsersWithFullDetails();
            return ResponseEntity.ok(users);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }




}
