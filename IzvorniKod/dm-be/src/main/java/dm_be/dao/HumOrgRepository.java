package dm_be.dao;

import dm_be.domain.HumOrg;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HumOrgRepository extends JpaRepository<HumOrg, Long> {
}
