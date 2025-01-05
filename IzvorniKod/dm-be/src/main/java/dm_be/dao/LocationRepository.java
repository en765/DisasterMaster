package dm_be.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import dm_be.domain.Location;


public interface LocationRepository extends JpaRepository<Location, Long> {
}
