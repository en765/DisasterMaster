package dm_be.service.impl;

import dm_be.dao.UserRepository;
import dm_be.domain.Citizen;
import dm_be.domain.User;
import dm_be.rest.UserRequestDTO;
import dm_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceJpa implements UserService {


    @Override
    public User createUser(UserRequestDTO userRequest) {
        return null;
    }
}
