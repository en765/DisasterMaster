package dm_be.service;

import dm_be.dao.AppUserRepository;
import dm_be.dao.RoleRepository;
import dm_be.domain.AppUser;
import dm_be.domain.Role;
import dm_be.dto.AppUserRequestDTO;
import dm_be.service.AppUserService;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppUserServiceImpl implements AppUserService {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    @Override
    public AppUser addAppUser(AppUserRequestDTO appUserRequestDTO) {
        Optional<Role> roleOptional = roleRepository.findByRoleId(appUserRequestDTO.getRoleId());
        if (roleOptional.isEmpty()) {
            throw new IllegalArgumentException("Role not found: " + appUserRequestDTO.getRoleId());
        }

        Role role = roleOptional.get();
        
        AppUser appUser = new AppUser();
        appUser.setUsername(appUserRequestDTO.getUsername());
        appUser.setEmail(appUserRequestDTO.getEmail());
        appUser.setPassword(appUserRequestDTO.getPassword()); // Password should be hashed
        appUser.setRole(role);

        return appUserRepository.save(appUser);
    }

    @Override
    public AppUser getUserByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    
}
