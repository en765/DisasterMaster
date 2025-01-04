package dm_be.dao;

import dm_be.domain.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    //eventualne dodatne metode
}
