package dm_be.service;

import dm_be.domain.AppUser;
import dm_be.rest.UserRequestDTO;

import java.util.List;

public interface AppUserService {
    AppUser createUser(AppUser user, Long roleId);

}

