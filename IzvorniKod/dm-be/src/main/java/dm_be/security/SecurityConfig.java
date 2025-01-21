package dm_be.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableWebSecurity
public class SecurityConfig {


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors() // CORS konfiguracija se dodaje odvojeno
            .and()
            .csrf().disable() // Možeš dodati CSRF zaštitu ako koristiš token
            .authorizeHttpRequests()
            .requestMatchers("/users/login-success", "/users/register", "/reports/**").permitAll() // Dozvoli nesigurne pristupe za određene rute
            .anyRequest().authenticated() // Sve ostale rute zahtevaju autentifikaciju
            .and()
            .oauth2Login().defaultSuccessUrl("/login-success", true);
        return http.build();
    }

}


