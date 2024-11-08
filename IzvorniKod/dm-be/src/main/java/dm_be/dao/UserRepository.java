package dm_be.dao;

import dm_be.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Osnovne CRUD metode su naslijeđene iz JpaRepository
    // Ovdje možete definirati dodatne metode po potrebi, npr.:

    // Metoda za pronalaženje korisnika po email adresi
    Optional<User> findByEmail(String email);
}
