package dm_be.login;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/login**", "/oauth2/**", "/error") // Disable CSRF for OAuth2 and error pages
                )
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/", "/login**", "/error").permitAll() // Allow access to these paths
                        .anyRequest().authenticated() // All other paths need authentication
                )
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("/home", true)   // Redirect to the front-end after successful login
                        .failureUrl("/login?error=true")    // Redirect to the login page on failure
                );

        return http.build();

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5175"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
