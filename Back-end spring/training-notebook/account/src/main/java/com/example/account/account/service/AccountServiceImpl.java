package com.example.account.account.service;

import com.example.account.account.entite.Account;
import com.example.account.account.repository.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepo accountRepo;

    @Autowired
    public AccountServiceImpl(AccountRepo accountRepo) {
        this.accountRepo = accountRepo;
    }

    @Override
    public Optional<Account> getAccountById(Long id) {
        return accountRepo.findById(id);
    }

    @Override
    public List<Account> getAccounts() {
        return accountRepo.findAll();
    }

    @Override
    public Account createAccount(Account account) {
        return accountRepo.save(account);
    }

    @Override
    public void deleteAccount(Long id) {
        accountRepo.deleteById(id);
    }

    @Override
    public Optional<Account> getAccountByLogin(String login) {
        return accountRepo.findByLogin(login);
    }
}