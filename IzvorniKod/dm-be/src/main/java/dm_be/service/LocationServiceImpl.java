package dm_be.service;

import dm_be.domain.Location;
import dm_be.dao.LocationRepository;
import dm_be.dto.LocationRequestDTO;
import dm_be.service.LocationService;
import org.springframework.stereotype.Service;

import java.util.List;

public class LocationServiceImpl implements LocationService {
    
    private final LocationRepository locationRepo;

    public LocationServiceImpl(LocationRepository locationRepo) {
        this.locationRepo = locationRepo;
    }

    @Override
    public Location createLocation(LocationRequestDTO locationDTO) {
        Location location = new Location(
            locationDTO.getName(),
            locationDTO.getLatitude(),
            locationDTO.getLongitude(),
            locationDTO.getAddress(),
            locationDTO.getCity(),
            locationDTO.getZipCode()
        );
        return locationRepo.save(location);
    }

    @Override
    public List<Location> getAllLocations() {
        return locationRepo.findAll();
    }

    @Override
    public Location getLocationById(Long id) {
        return locationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Location not found"));
    }

    @Override
    public Location updateLocation(Long id, LocationRequestDTO locationRequestDTO) {
        Location location = locationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Location not found"));

        location.setName(locationRequestDTO.getName());
        location.setLatitude(locationRequestDTO.getLatitude());
        location.setLongitude(locationRequestDTO.getLongitude());
        location.setAddress(locationRequestDTO.getAddress());
        location.setCity(locationRequestDTO.getCity());
        location.setZipCode(locationRequestDTO.getZipCode());

        return locationRepo.save(location);
    }

    @Override
    public void deleteLocation(Long id) {
        Location location = locationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Location not found"));
        locationRepo.delete(location);
    }
}
