package dm_be.service;

import dm_be.domain.AppUser;
public interface AppUserService {
    AppUser createUser(AppUser user, Long roleId);

}

