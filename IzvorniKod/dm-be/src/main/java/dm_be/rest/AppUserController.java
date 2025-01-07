package dm_be.rest;

import dm_be.service.*;
import dm_be.domain.*;
import dm_be.dto.AppUserRequestDTO;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class AppUserController {
    
    @Autowired
    private AppUserService appUserService;

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("")
    public List<AppUser> getAllUsers() {
        return appUserService.getAllUsers();
    }

    @PostMapping("/register")
    public void addAppUser(@RequestBody AppUserRequestDTO appUser) {
        appUserService.addAppUser(appUser);
    }


}
