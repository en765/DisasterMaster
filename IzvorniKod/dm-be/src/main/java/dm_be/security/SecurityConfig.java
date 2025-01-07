package dm_be.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Onemogućavanje CSRF za H2 konzolu i javne rute
            .csrf().disable()
            // Omogućavanje frame options za H2 konzolu
            .headers().frameOptions().disable()
            .and()
            .authorizeHttpRequests()
                // Dopuštenje pristupa H2 konzoli
                .requestMatchers("/h2-console/**").permitAll()
                // Dopuštanje registracije bez autentifikacije
                .requestMatchers("/users/**").permitAll()
                // Sve ostalo zahtijeva autentifikaciju
                .anyRequest().authenticated()
            .and()
            .formLogin(); // Omogućavanje forme za login (ako je potrebno)

        return http.build();
    }
}
