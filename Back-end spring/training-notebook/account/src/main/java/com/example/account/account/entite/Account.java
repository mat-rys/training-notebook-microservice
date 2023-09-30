package com.example.account.account.entite;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString

@Entity
@EnableAutoConfiguration
@Table(name = "account")
public class Account {

    public Account(String name, String login, String password, String email, String role) {
        this.name = name;
        this.login = login;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Long id;
    @Column(name = "account_name")
    private String name;
    @Column(name = "login")
    private String login;
    @Column(name = "account_password")
    private String password;
    //    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,63}$", message = "Nieprawidłowy adres email")
    @Column(name = "email")
    private String email;
    @Column(name = "account_role")
    private String role;
}
