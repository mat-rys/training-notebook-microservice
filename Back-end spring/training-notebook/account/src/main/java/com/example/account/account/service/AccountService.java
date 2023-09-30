package com.example.account.account.service;

import com.example.account.account.entite.Account;

import java.util.List;
import java.util.Optional;

public interface AccountService {

    Optional<Account> getAccountById(Long id);
    List<Account> getAccounts();
    Account createAccount(Account account);
    void deleteAccount(Long id);

    Optional<Account> getAccountByLogin(String login);
}
