package dm_be.service;

import dm_be.dao.AppUserRepository;
import dm_be.dao.RoleRepository;
import dm_be.domain.AppUser;
import dm_be.domain.Role;
import dm_be.dto.AppUserRequestDTO;
import dm_be.service.AppUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppUserServiceImpl implements AppUserService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    @Override
    public AppUser addAppUser(AppUserRequestDTO appUserRequestDTO) {
        // Validacija podataka
        Optional<Role> roleOptional = roleRepository.findByRoleId(appUserRequestDTO.getRoleId());
        if (roleOptional.isEmpty()) {
            throw new IllegalArgumentException("Role not found: " + appUserRequestDTO.getRoleId());
        }

        Role role = roleOptional.get();
        
        // Kreiranje novog korisnika
        AppUser appUser = new AppUser();
        appUser.setUsername(appUserRequestDTO.getUsername());
        appUser.setEmail(appUserRequestDTO.getEmail());
        appUser.setPassword(passwordEncoder.encode(appUserRequestDTO.getPassword())); // Lozinka je hashirana
        appUser.setRole(role);

        return appUserRepository.save(appUser);
    }
}
