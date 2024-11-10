package dm_be.service.impl;

import dm_be.dao.*;
import dm_be.domain.*;
import dm_be.service.*;
import org.springframework.stereotype.Service;

@Service
public class UserServiceJpa implements UserService {

    private RoleRepository roleRepo;
    private UserRepository userRepo;


    @Override
    public User createUser(User user, Long roleId) {
        Role role = roleRepo.findById(roleId).orElseThrow(() -> new RuntimeException("Role not found"));
    user.setRole(role);
    return userRepo.save(user);
    }
}
