package dm_be.dao;

import dm_be.domain.Government;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GovernmentRepository extends JpaRepository<Government, Long> {
}
