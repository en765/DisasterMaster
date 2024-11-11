package dm_be.dao;

import dm_be.domain.HumanitarianOrganisation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HumOrgRepository extends JpaRepository<HumanitarianOrganisation, Long> {
}
