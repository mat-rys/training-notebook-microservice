package com.example.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;


import java.util.Arrays;

@Configuration
public class SecurityConfig  {

        @Bean
        public SecurityWebFilterChain securityFilterChain(ServerHttpSecurity http) throws Exception {
                http
                        .authorizeExchange()
                        .pathMatchers("/actuator/**").permitAll()
                        .pathMatchers("/notes/**","/account/**","/body/**","/nutrition/**").permitAll()
                        .and()
                        .authorizeExchange().anyExchange().authenticated()
                        .and()
                        .csrf().disable()
                        .cors();
                return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // Adres Angulara
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Dopuszczalne metody
                configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "accept", "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers")); // Dopuszczalne nagłówki
                configuration.setAllowCredentials(true); // Pozwala na przesyłanie plików cookie w zapytaniach
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }

//        @Bean
//        public ServerLogoutSuccessHandler keycloakLogoutSuccessHandler(ReactiveClientRegistrationRepository repository) {
//
//                OidcClientInitiatedServerLogoutSuccessHandler oidcLogoutSuccessHandler =
//                        new OidcClientInitiatedServerLogoutSuccessHandler(repository);
//
//                oidcLogoutSuccessHandler.setPostLogoutRedirectUri("{baseUrl}/logout");
//
//                return oidcLogoutSuccessHandler;
//        }
}



