package dm_be.service;

import dm_be.domain.Location;
import dm_be.dto.LocationRequestDTO;

import java.util.List;

public interface LocationService {
    Location createLocation(LocationRequestDTO locationDTO);
    List<Location> getAllLocations();
    Location getLocationById(Long id);
    Location updateLocation(Long id, LocationRequestDTO locationDTO);
    void deleteLocation(Long id);
}
