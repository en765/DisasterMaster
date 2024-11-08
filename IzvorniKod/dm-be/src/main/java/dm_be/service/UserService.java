package dm_be.service;

import dm_be.domain.User;
import dm_be.rest.UserRequestDTO;

public interface UserService {
    User createUser(UserRequestDTO userRequest);
}
