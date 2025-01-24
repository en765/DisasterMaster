package dm_be.rest;

import dm_be.dao.AppUserRepository;
import dm_be.service.*;
import dm_be.domain.*;
import dm_be.dto.AppUserRequestDTO;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "https://disastermaster.onrender.com")
@RequestMapping("/users")
public class AppUserController {
    
    @Autowired
    private AppUserService appUserService;

    @Autowired
    private AppUserRepository appUserRepository;

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("")
    public List<AppUser> getAllUsers() {
        return appUserService.getAllUsers();
    }

    @PostMapping("/register")
    public ResponseEntity<AppUser> addAppUser(@RequestBody AppUserRequestDTO appUser) {
        AppUser createdUser = appUserService.addAppUser(appUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PostMapping("/subescribe")
    public ResponseEntity<String> subscribe(@RequestBody String email) {
        // ovo je kao uz pretpostavku da ako je netko anoniman, onda ni ne zeli obavijesti
        AppUser updateUser = appUserRepository.findByEmail(email); //nadi tog usera
        updateUser.setSubbed("true"); // zakaci da zeli obavijesti
        appUserRepository.save(updateUser);
        return ResponseEntity.ok("Dobili email!");
    }


}
