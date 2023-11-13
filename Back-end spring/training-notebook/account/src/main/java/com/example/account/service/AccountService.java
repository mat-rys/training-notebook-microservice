package com.example.account.service;

import com.example.account.dto.UserDetailsResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Service;
import java.util.Map;

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
            return null; // Lub możesz rzucić wyjątek lub zwrócić odpowiedź błędu, w zależności od Twojego przypadku użycia.
        } catch (Exception e) {
            log.error("An error occurred while fetching user", e);
            return null; // Lub możesz rzucić wyjątek lub zwrócić odpowiedź błędu, w zależności od Twojego przypadku użycia.
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
            return null; // Lub możesz rzucić wyjątek lub zwrócić odpowiedź błędu, w zależności od Twojego przypadku użycia.
        } catch (Exception e) {
            log.error("An error occurred while fetching user", e);
            return null; // Lub możesz rzucić wyjątek lub zwrócić odpowiedź błędu, w zależności od Twojego przypadku użycia.
        }
    }


    public boolean updateEmail(String idKeycloak, String newEmail) {
        String sql = "UPDATE user_entity SET email = ? WHERE id = ?";

        try {
            int rowsAffected = jdbcTemplate.update(sql, newEmail, idKeycloak);
            return rowsAffected > 0;
        } catch (DataAccessException e) {
            log.error("An error occurred while updating email", e);
            return false;
        }
    }

    public boolean updateFirstName(String idKeycloak, String newFirstName) {
        String sql = "UPDATE user_entity SET first_name = ? WHERE id = ?";

        try {
            int rowsAffected = jdbcTemplate.update(sql, newFirstName, idKeycloak);
            return rowsAffected > 0;
        } catch (DataAccessException e) {
            log.error("An error occurred while updating first name", e);
            return false;
        }
    }

    public boolean updateLastName(String idKeycloak, String newLastName) {
        String sql = "UPDATE user_entity SET last_name = ? WHERE id = ?";

        try {
            int rowsAffected = jdbcTemplate.update(sql, newLastName, idKeycloak);
            return rowsAffected > 0;
        } catch (DataAccessException e) {
            log.error("An error occurred while updating last name", e);
            return false;
        }
    }

    public boolean updateUsername(String idKeycloak, String newUsername) {
        String sql = "UPDATE user_entity SET username = ? WHERE id = ?";

        try {
            int rowsAffected = jdbcTemplate.update(sql, newUsername, idKeycloak);
            return rowsAffected > 0;
        } catch (DataAccessException e) {
            log.error("An error occurred while updating username", e);
            return false;
        }
    }


}
