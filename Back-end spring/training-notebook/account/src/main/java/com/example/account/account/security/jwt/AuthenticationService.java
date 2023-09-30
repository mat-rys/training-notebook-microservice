package com.example.account.account.security.jwt;

import com.example.account.account.controller.AuthRequest;
import com.example.account.account.controller.AuthResponse;
import com.example.account.account.entite.Account;
import com.example.account.account.service.AccountServiceImpl;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;


@Service
@AllArgsConstructor
public class AuthenticationService  {

  private final AccountServiceImpl accountServiceImpl;
  private final RsaKeyProperties rsaKeys;



    public void register(Account account) {
    account.setPassword(passwordEncoder().encode(account.getPassword()));
        accountServiceImpl.createAccount(account);
        System.out.println(account);

  }

    public AuthResponse login(@NonNull String login, @NonNull String password) {
        Optional<Account> account = accountServiceImpl.getAccountByLogin(login);
        var jwtToken = generateToken(account.get());
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        return login(request.getLogin(), request.getPassword());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String userName = getTokenName(token);
        return userName.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        Jwt jwt = getTokenDecoded(token);
        Instant now = Instant.now();
        Instant expiresAt = jwt.getExpiresAt();
        if(now.isAfter(expiresAt)){
            return now.isAfter(expiresAt);
        }
        return false;
    }

    public String getTokenName(String token) {
        Jwt jwt = getTokenDecoded(token);
        String name = jwt.getSubject();
        return name;

    }

    public Jwt getTokenDecoded(String token){
        return jwtDecoder().decode(token);
    }

    public String generateToken(Account account) {
        Instant now = Instant.now();
        String role = account.getRole(); // Przykład pobierania roli ze studenta
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(account.getLogin()) // Przykład ustawienia emaila jako subject
                .claim("role", role)
                .build();
        return jwtEncoder().encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey.Builder(rsaKeys.publicKey()).privateKey(rsaKeys.privateKey()).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(rsaKeys.publicKey()).build();
    }



}
