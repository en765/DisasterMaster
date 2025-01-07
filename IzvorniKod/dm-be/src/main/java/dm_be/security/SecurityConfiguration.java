package dm_be.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // Onemogući CSRF za H2 konzolu
            .headers().frameOptions().disable() // Omogući H2 konzolu u iframe-u
            .and()
            .authorizeHttpRequests()
            .requestMatchers("/h2-console/**").permitAll() // Dozvoli pristup H2 konzoli
            .anyRequest().authenticated(); // Svi ostali zahtevi zahtevaju autentifikaciju

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
