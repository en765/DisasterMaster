package dm_be.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import dm_be.dao.AppUserRepository;
import dm_be.dao.RoleRepository;
import dm_be.domain.AppUser;
import dm_be.domain.Role;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OAuth2Controller {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/login-success")
    public String loginSuccess(OAuth2AuthenticationToken authenticationToken) {
        // Dohvati korisničke atribute iz tokena
        String userEmail = authenticationToken.getPrincipal().getAttribute("email");
        String userName = authenticationToken.getPrincipal().getAttribute("name");

        // Provjeri postoji li korisnik
        AppUser existingUser = appUserRepository.findByEmail(userEmail);

        if (existingUser == null) {
            // Kreiraj novog korisnika
            AppUser newUser = new AppUser();
            newUser.setEmail(userEmail);
            newUser.setUsername(userName);
            newUser.setPassword(""); // Nije potrebno za OAuth2 korisnike


            appUserRepository.save(newUser);
        }

        return userName;
    }

    @GetMapping("/")
    public String home() {
        return "Welcome to the application!";
    }
}
