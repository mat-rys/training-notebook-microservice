    package com.example.account.account.security;

    import com.example.account.account.entite.Account;
    import lombok.AllArgsConstructor;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.core.GrantedAuthority;
    import org.springframework.security.core.authority.SimpleGrantedAuthority;
    import org.springframework.security.core.userdetails.UserDetails;

    import java.util.Arrays;
    import java.util.Collection;

    @AllArgsConstructor
    public class SecurityUser implements UserDetails {

        private final Account account;

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
                return Arrays.stream(account
                                .getRole()
                                .split(","))
                        .map(SimpleGrantedAuthority::new)
                        .toList();
        }

        @Override
        public String getPassword() {
            return account.getPassword();
        }

        @Override
        public String getUsername() {
            return account.getLogin();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
