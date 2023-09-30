package com.example.account.account.repository;

import com.example.account.account.entite.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepo extends JpaRepository<Account,Long> {
    Optional<Account> findByLogin(String login);
}
