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
        String sql = "UPDATE user_entity SET " + attribute + " = ? WHERE id = ?";
        try {
            int rowsAffected = jdbcTemplate.update(sql, newValue, idKeycloak);
            return rowsAffected > 0;
        } catch (DataAccessException e) {
            log.error("An error occurred while updating " + attribute, e);
            return false;
        }
    }
}
