package dm_be.service.impl;

import dm_be.dao.*;
import dm_be.domain.*;
import dm_be.service.*;
import org.springframework.stereotype.Service;

@Service
public class AppUserServiceJpa implements AppUserService {

    private RoleRepository roleRepo;
    private AppUserRepository userRepo;


    @Override
    public AppUser createUser(AppUser user, Long roleId) {
        Role role = roleRepo.findById(roleId).orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRole(role);
        return userRepo.save(user);
    }
}
