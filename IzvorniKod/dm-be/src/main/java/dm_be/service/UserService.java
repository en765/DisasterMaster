package dm_be.service;

import dm_be.domain.User;
import dm_be.rest.UserRequestDTO;

import java.util.List;

public interface UserService {
    User createUser(User user, Long roleId);

}
