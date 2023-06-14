package dke.vaccine_location_drug.service;

import dke.vaccine_location_drug.entity.Location;
import dke.vaccine_location_drug.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Location getLocationById(int id) {
        Optional<Location> optionalLocation = locationRepository.findById(id);
        return optionalLocation.orElse(null);
    }

    public Location saveLocation(Location location) {
        return locationRepository.save(location);
    }

    public void deleteLocation(int id) {
        locationRepository.deleteById(id);
    }

    public List<Location> getLocationsByCounty(String county) {
        return locationRepository.findByCounty(county);
    }
}
