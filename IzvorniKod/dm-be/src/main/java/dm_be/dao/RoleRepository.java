package dm_be.dao;

import dm_be.domain.Role;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleId(Long id);
    Optional<Role> findByRoleName(String roleName);
}
