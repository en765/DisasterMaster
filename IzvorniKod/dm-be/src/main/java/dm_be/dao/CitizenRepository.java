package dm_be.dao;

import dm_be.domain.Citizen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CitizenRepository extends JpaRepository<Citizen, Long> {
    //eventualne metode za pretragu
}
