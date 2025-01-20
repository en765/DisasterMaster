package dm_be.service;

import dm_be.dao.AppUserRepository;
import dm_be.dao.RoleRepository;
import dm_be.domain.AppUser;
import dm_be.domain.Role;
import dm_be.dto.AppUserRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
        appUser.setPassword("");
        appUser.setRole(role);
        //appUser.setSubscribed(false);

        return appUserRepository.save(appUser);
    }

    @Override
    public AppUser getUserByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public AppUser subscribeUser(Long userId) {
        System.out.println("subscribeUser called with userId: " + userId);
        Optional<AppUser> optionalUser = appUserRepository.findById(userId);
        if (optionalUser.isPresent()) {
            AppUser user = optionalUser.get();
            user.setSubscribed(true);
            return appUserRepository.save(user);
        } else {
            throw new RuntimeException("User not found with id: " + userId);
        }
    }
}
