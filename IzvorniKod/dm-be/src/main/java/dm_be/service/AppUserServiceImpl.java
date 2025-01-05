package dm_be.service;

import dm_be.dao.AppUserRepository;
import dm_be.dao.RoleRepository;
import dm_be.domain.AppUser;
import dm_be.domain.Role;
import dm_be.service.AppUserService;
import org.springframework.stereotype.Service;

@Service
public class AppUserServiceImpl implements AppUserService {
    
    private final RoleRepository roleRepo;
    private final AppUserRepository userRepo;

    public AppUserServiceImpl(RoleRepository roleRepo, AppUserRepository userRepo) {
        this.roleRepo = roleRepo;
        this.userRepo = userRepo;
    }

    @Override
    public AppUser createUser(AppUser user, Long roleId) {
        Role role = roleRepo.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found with ID: " + roleId));
        user.setRole(role);
        return userRepo.save(user);
    }
}
