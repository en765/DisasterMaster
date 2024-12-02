package dm_be.login;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class UserController {

    /*@PostMapping("/auth/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginRequest loginRequest) {
        if ("user".equals(loginRequest.getUsername()) && "password".equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("Login successful!");
        }
        return ResponseEntity.status(401).body("Invalid credentials!");
    }*/

    public ResponseEntity<Map<String, String>> oauth2Success(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
            String name = oauthUser.getAttribute("name");
            String email = oauthUser.getAttribute("email");

            Map<String, String> response = new HashMap<>();
            response.put("name", name);
            response.put("email", email);

            // Here you can store the user's data into your database if needed
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(null);
    }

}
