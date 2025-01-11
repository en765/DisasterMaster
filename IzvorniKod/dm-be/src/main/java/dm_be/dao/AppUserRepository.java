package dm_be.dao;

import dm_be.domain.AppUser;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
    AppUser findByUserId (Long id);
    AppUser findByEmail(String email);
}
