package com.example.account.service;

import com.example.account.dto.Session;
import com.example.account.dto.UserDetailsResponse;
import com.example.account.dto.UserForAdminDetailsResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class AccountService {

    private final JdbcTemplate jdbcTemplate;


    public UserDetailsResponse getUserService(String idKeycloak) {
        try {
            log.info("Fetching user with ID: {}", idKeycloak);
            Map<String, Object> user = jdbcTemplate.queryForMap("SELECT * FROM user_entity WHERE id = ?", idKeycloak);
            System.out.println(user);

            UserDetailsResponse userDetailsResponse = new UserDetailsResponse();
            userDetailsResponse.setEmail((String) user.get("email"));
            userDetailsResponse.setFirstName((String) user.get("first_name"));
            userDetailsResponse.setLastName((String) user.get("last_name"));
            userDetailsResponse.setUsername((String) user.get("username"));
            userDetailsResponse.setEmailVerified((boolean) user.get("email_verified"));

            log.info("User retrieved successfully: {}", userDetailsResponse);
            return userDetailsResponse;
        } catch (EmptyResultDataAccessException e) {
            log.warn("User with ID {} not found", idKeycloak);
            return null;
        } catch (Exception e) {
            log.error("An error occurred while fetching user", e);
            return null;
        }
    }

    public String getUserId(String idKeycloak) {
        try {
            log.info("Fetching user with ID: {}", idKeycloak);
            String userId = jdbcTemplate.queryForObject("SELECT id FROM user_entity WHERE id = ?", String.class, idKeycloak);
            System.out.println("User ID: " + userId);
            return userId;
        } catch (EmptyResultDataAccessException e) {
            log.warn("User with ID {} not found", idKeycloak);
            return null;
        } catch (Exception e) {
            log.error("An error occurred while fetching user", e);
            return null;
        }
    }

    public boolean updateAttribute(String idKeycloak, String attribute, String newValue) {
        System.out.println(attribute);
        String sql = "UPDATE user_entity SET " + attribute + " = ? WHERE id = ?";
        try {
            int rowsAffected = jdbcTemplate.update(sql, newValue, idKeycloak);
            return rowsAffected > 0;
        } catch (DataAccessException e) {
            log.error("An error occurred while updating " + attribute, e);
            return false;
        }
    }

    public List<UserForAdminDetailsResponse> getAllUsers() {
        try {
            log.info("Fetching all users except 'admin'");

            // Pobieranie danych użytkowników z uwzględnieniem kolumny 'id'
            List<Map<String, Object>> users = jdbcTemplate.queryForList("SELECT id, email, first_name, last_name, username, enabled FROM user_entity WHERE username != 'admin'");

            // Mapowanie wyników na listę obiektów UserForAdminDetailsResponse
            List<UserForAdminDetailsResponse> userDetailsResponses = users.stream().map(user -> {
                UserForAdminDetailsResponse userDetailsResponse = new UserForAdminDetailsResponse();
                userDetailsResponse.setUserId((String) user.get("id")); // Przypisanie ID użytkownika
                userDetailsResponse.setEmail((String) user.get("email"));
                userDetailsResponse.setFirstName((String) user.get("first_name"));
                userDetailsResponse.setLastName((String) user.get("last_name"));
                userDetailsResponse.setUsername((String) user.get("username"));
                userDetailsResponse.setEnabled((boolean) user.get("enabled"));
                return userDetailsResponse;
            }).toList();

            log.info("All users retrieved successfully, excluding 'admin'");
            return userDetailsResponses;
        } catch (Exception e) {
            log.error("An error occurred while fetching all users", e);
            return List.of();
        }
    }


    public boolean deleteUser(String idKeycloak) {
        try {
            log.info("Deleting user with ID: {}", idKeycloak);

            // Usuwanie powiązanych danych z tabel podrzędnych
            jdbcTemplate.update("DELETE FROM credential WHERE user_id = ?", idKeycloak);
            jdbcTemplate.update("DELETE FROM user_role_mapping WHERE user_id = ?", idKeycloak);

            // Usunięcie użytkownika
            int rowsAffected = jdbcTemplate.update("DELETE FROM user_entity WHERE id = ?", idKeycloak);

            log.info("User with ID: {} deleted successfully", idKeycloak);
            return rowsAffected > 0;
        } catch (DataAccessException e) {
            log.error("An error occurred while deleting user with ID: {}", idKeycloak, e);
            return false;
        }
    }
    ////////////////////////////




    ////////////////////////////
    public List<Map<String, Object>> getAllUsersWithFullDetails() {
        try {
            String sql = "SELECT * FROM user_entity";  // Zapytanie pobierające wszystkie kolumny
            return jdbcTemplate.queryForList(sql);  // Wykonanie zapytania i zwrócenie wyników w postaci listy map
        } catch (DataAccessException e) {
            log.error("An error occurred while fetching full user details", e);
            return new ArrayList<>();
        }
    }






}
