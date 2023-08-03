package com.example.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
public class SecurityConfig {


        @Bean
        public SecurityWebFilterChain securityFilterChain(ServerHttpSecurity http) throws Exception {
                http
                        .authorizeExchange()
                        .pathMatchers("/actuator/**")
                        .permitAll()
                        .and()
                        .authorizeExchange()
                        .anyExchange()
                        .authenticated()
                        .and()
                        .csrf().disable()
                        .oauth2Login();


                return http.build();
        }


}



