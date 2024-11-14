package dm_be.rest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /*@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests()
                    .requestMatchers("/", "/login", "/oauth2/**") // Match URLs for public access
                    .permitAll() // Allow public access to these URLs
                    .anyRequest().authenticated() // All other URLs require authentication
                .and()
                    .oauth2Login() // Enable OAuth2 login (Google, etc.)
                    .defaultSuccessUrl("/home") // Redirect after successful login
                    .failureUrl("/login?error=true"); // Redirect in case of failure

        return http.build();
    }*/
}

