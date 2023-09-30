package com.example.account.account.controller;

import com.example.account.account.entite.Account;
import com.example.account.account.security.jwt.AuthenticationService;
import com.example.account.account.service.AccountService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/account")
@AllArgsConstructor
public class AccountController {


    private final AuthenticationService authenticationService;
    private final AccountService accountService;

    // Znajdź konto po ID
    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        log.info("Pobieranie konta o ID: {}", id);
        Optional<Account> account = accountService.getAccountById(id);
        return account.map(ResponseEntity::ok)
                .orElseGet(() -> {
                    log.warn("Konto o ID {} nie zostało znalezione.", id);
                    return ResponseEntity.notFound().build();
                });
    }

    // Pobierz wszystkie konta
    @GetMapping("/all")
    public ResponseEntity<List<Account>> getAccounts() {
        log.info("Pobieranie wszystkich kont");
        List<Account> accounts = accountService.getAccounts();
        return ResponseEntity.ok(accounts);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request){
        return ResponseEntity.ok(authenticationService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody Account account) {
        authenticationService.register(account);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

//    // Stwórz nowe konto
//    @PostMapping("/registration")
//    public ResponseEntity<Account> createAccount(@RequestBody Account account) {
//        log.info("Tworzenie nowego konta: {}", account.getName());
//        Account createdAccount = accountService.createAccount(account);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdAccount);
//    }





    // Usuń konto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        log.info("Usuwanie konta o ID: {}", id);
        accountService.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }
}
