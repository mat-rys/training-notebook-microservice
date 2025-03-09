package com.example.account.service;

import com.example.account.dto.Session;
import com.example.account.dto.UserRegistrationDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
@Slf4j
public class KeycloakService {

    private final RestTemplate restTemplate;
    private static final String REALM = "training-notebook-microservice-realm";
    private static final String TOKEN_URL = "http://localhost:8191/auth/realms/master/protocol/openid-connect/token";
    private static final String USERS_URL = "http://localhost:8191/auth/admin/realms/training-notebook-microservice-realm/users";
    private static String adminAccessToken = null;  // Zmienna przechowująca token admina
    private static long tokenTimestamp = 0;  // Zmienna przechowująca timestamp wygenerowania token

    private static final long TOKEN_EXPIRATION_TIME = 60 * 1000;  // Czas ważności tokena w milisekundach (60 sekund)

    public String getAdminAccessToken() {
        // Sprawdzamy, czy token jest nadal ważny
        long currentTime = System.currentTimeMillis();
        if (adminAccessToken == null || currentTime - tokenTimestamp > TOKEN_EXPIRATION_TIME) {
            adminAccessToken = fetchAdminAccessToken();  // Pobierz nowy token, jeśli wygasł
        }
        return adminAccessToken;
    }

    private String fetchAdminAccessToken() {
        // Zakładając, że dane do logowania są stałe, możemy przechowywać je bezpośrednio w metodzie
        String username = "admin";
        String password = "Pa55w0rd";
        String clientId = "admin-cli";
        String clientSecret = "6aiXmUlE27BiMVUerHBVNCUTJs4ascMS";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Przygotowanie body dla x-www-form-urlencoded
        String body = "grant_type=password&username=" + username +
                "&password=" + password +
                "&client_id=" + clientId +
                "&client_secret=" + clientSecret;

        HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(TOKEN_URL, HttpMethod.POST, requestEntity, Map.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody().get("access_token").toString();
            } else {
                throw new RuntimeException("Failed to fetch admin token. Status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error fetching admin token: " + e.getMessage(), e);
        }
    }

    public List<Session> getAllUserSessions() {
        String token = getAdminAccessToken();  // Pobranie tokena
        String usersUrl = String.format("http://localhost:8191/auth/admin/realms/%s/users", REALM);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        try {
            // Pobranie wszystkich użytkowników
            ResponseEntity<List> usersResponse = restTemplate.exchange(usersUrl, HttpMethod.GET, requestEntity, List.class);
            if (!usersResponse.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Failed to fetch users. Status: " + usersResponse.getStatusCode());
            }

            // Lista użytkowników
            List<Map<String, Object>> users = usersResponse.getBody();
            List<Session> allSessions = new ArrayList<>();

            // Iteracja po użytkownikach
            for (Map<String, Object> user : users) {
                String userId = (String) user.get("id");
                String username = (String) user.get("username");

                // Wykluczanie administratora
                if ("admin".equalsIgnoreCase(username)) {
                    continue;
                }

                // Pobranie sesji dla użytkownika
                String sessionsUrl = String.format("http://localhost:8191/auth/admin/realms/%s/users/%s/sessions", REALM, userId);
                try {
                    ResponseEntity<List> sessionsResponse = restTemplate.exchange(sessionsUrl, HttpMethod.GET, requestEntity, List.class);
                    if (sessionsResponse.getStatusCode().is2xxSuccessful() && sessionsResponse.getBody() != null) {
                        // Jeśli sesje są dostępne
                        for (Map<String, Object> sessionData : (List<Map<String, Object>>) sessionsResponse.getBody()) {
                            Session session = new Session();
                            session.setId((String) sessionData.get("id"));
                            session.setUsername(username);
                            session.setUserId(userId);
                            session.setIpAddress((String) sessionData.get("ipAddress"));
                            session.setStart(((Number) sessionData.get("start")).longValue());
                            session.setLastAccess(((Number) sessionData.get("lastAccess")).longValue());

                            // Pobieranie klientów (jeśli są dostępni)
                            Map<String, String> clients = (Map<String, String>) sessionData.get("clients");
                            if (clients != null) {
                                session.setClients(clients);
                            }

                            allSessions.add(session);
                        }
                    }
                } catch (Exception e) {
                    System.err.println("Error fetching sessions for user " + username + ": " + e.getMessage());
                }
            }

            return allSessions;
        } catch (Exception e) {
            throw new RuntimeException("Error fetching all user sessions: " + e.getMessage(), e);
        }
    }




    // Usuwanie sesji użytkownika
    public void deleteUserSession(String sessionId) {
        String token = getAdminAccessToken();  // Pobranie tokena
        String url = String.format("http://localhost:8191/auth/admin/realms/%s/sessions/%s", REALM, sessionId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, Void.class);

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Failed to delete session. Status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error deleting session: " + e.getMessage(), e);
        }
    }

    // Aktualizacja statusu użytkownika (włączony/wyłączony)
    public void updateUserStatus(String userId, boolean enabled) {
        String token = getAdminAccessToken();  // Pobranie tokena
        String url = String.format("http://localhost:8191/auth/admin/realms/%s/users/%s", REALM, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> payload = new HashMap<>();
        payload.put("enabled", enabled);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, Void.class);

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Failed to update user status. Status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error updating user status: " + e.getMessage(), e);
        }
    }

    // Nowa metoda do usuwania wszystkich sesji użytkownika
    public void deleteAllUserSessions(String userId) {
        String token = getAdminAccessToken();
        String sessionsUrl = String.format("http://localhost:8191/auth/admin/realms/%s/users/%s/sessions", REALM, userId);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        try {
            ResponseEntity<List> response = restTemplate.exchange(sessionsUrl, HttpMethod.GET, requestEntity, List.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                for (Map<String, Object> session : (List<Map<String, Object>>) response.getBody()) {
                    String sessionId = (String) session.get("id");
                    deleteUserSession(sessionId); // Usuwamy każdą sesję
                }
            } else {
                throw new RuntimeException("Failed to fetch user sessions. Status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user sessions: " + e.getMessage(), e);
        }
    }


    public void registerUser(Map<String, Object> userDetails) {
        String adminToken = getAdminAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(adminToken);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(userDetails, headers);

        try {
            ResponseEntity<Void> response = restTemplate.exchange(USERS_URL, HttpMethod.POST, requestEntity, Void.class);

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Failed to register user. Status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error registering user: " + e.getMessage(), e);
        }
    }

}
