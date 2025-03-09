package com.example.account.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@WebFilter("/*")
public class GatewayHeaderFilter extends OncePerRequestFilter {

    private static final String EXPECTED_TOKEN = "SecureToken123"; // Oczekiwana wartość tokena

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String gatewayToken = request.getHeader("X-Gateway-Token");
        String requestURI = request.getRequestURI();
        if (requestURI.startsWith("/account/register")) {
            filterChain.doFilter(request, response);
            return;
        }
        if (gatewayToken == null || !EXPECTED_TOKEN.equals(gatewayToken)) {
            // Jeśli nagłówek jest niepoprawny lub nieobecny, zwracamy błąd 403
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("Access denied: Missing or invalid gateway token");
            return;
        }
        // Jeśli token jest poprawny, kontynuujemy filtrowanie
        filterChain.doFilter(request, response);
    }
}

