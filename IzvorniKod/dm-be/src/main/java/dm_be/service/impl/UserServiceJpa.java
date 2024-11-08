package dm_be.service.impl;

import dm_be.dao.UserRepository;
import dm_be.domain.Citizen;
import dm_be.domain.Government;
import dm_be.domain.HumOrg;
import dm_be.domain.User;
import dm_be.rest.UserRequestDTO;
import dm_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceJpa implements UserService {

    private final UserRepository userRepo;

    @Autowired
    public UserServiceJpa(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public User createUser(UserRequestDTO userRequest) {
        User user;

        switch (userRequest.getUserType().toLowerCase()) {
            case "citizen":
                Citizen citizen = new Citizen();
                citizen.setFirstName(userRequest.getFirstName());
                citizen.setLastName(userRequest.getLastName());
                citizen.setIsAnonymous(userRequest.getIsAnonymous());
                user = citizen;
                break;

            case "humorg":
                HumOrg humOrg = new HumOrg();
                humOrg.setOrganizationName(userRequest.getOrganizationName());
                user = humOrg;
                break;

            case "government":
                Government government = new Government();
                government.setGovernmentName(userRequest.getGovernmentName());
                user = government;
                break;

            default:
                throw new IllegalArgumentException("Unknown user type: " + userRequest.getUserType());
        }

        // Postavljanje općih atributa koji su zajednički za sve korisnike
        user.setUserId(userRequest.getUserId());
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());
        user.setRoleId(userRequest.getRole());

        return userRepo.save(user);
    }
}
