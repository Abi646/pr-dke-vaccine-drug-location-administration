package dke.vaccine_location_drug.service;

import dke.vaccine_location_drug.entity.Line;
import dke.vaccine_location_drug.entity.Article;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import dke.vaccine_location_drug.entity.Location;
import dke.vaccine_location_drug.repository.LocationRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class LocationService {
    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    public Location updateLocation(Long locationId, Location updatedLocation) {
        Location existingLocation = locationRepository.findById(locationId)
                .orElseThrow(() -> new IllegalArgumentException("Location not found"));

        existingLocation.setName(updatedLocation.getName());
        existingLocation.setCounty(updatedLocation.getCounty());
        existingLocation.setAddress(updatedLocation.getAddress());
        existingLocation.setType(updatedLocation.getType());

        return locationRepository.save(existingLocation);
    }


    public void deleteLocation(Long locationId) {
        locationRepository.deleteById(locationId);
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Location getLocationById(long id) {
        return locationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Location not found with id: " + id));
    }
    public List<Location> searchLocationsByCounty(String county) {
        return locationRepository.findByCountyIgnoreCase(county);
    }

    public List<String> searchLocationsWithQuantity(String county) {
        List<Location> locations = locationRepository.findByCountyAndLinesQuantityGreaterThan(county, 0);
        return locations.stream()
                .map(Location::getName)
                .collect(Collectors.toList());
    }


    public List<Integer> getLinesWithQuantityByLocationName(String locationName) {
        Location location = locationRepository.findByName(locationName);
        if (location == null) {
            throw new IllegalArgumentException("Location not found");
        }

        return location.getLines().stream()
                .filter(line -> line.getQuantity() > 0)
                .map(Line::getLineNumber)
                .collect(Collectors.toList());
    }


    public int getArticleQuantityByLocationAndLineNumberAndName(String locationName, int lineNumber, String articleName) {
        Location location = locationRepository.findByName(locationName);
        if (location == null) {
            throw new IllegalArgumentException("Location not found");
        }

        Line line = location.getLines().stream()
                .filter(l -> l.getLineNumber() == lineNumber)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Line not found"));

        Article article = line.getArticle();
        if (article == null || !article.getName().equalsIgnoreCase(articleName)) {
            throw new IllegalArgumentException("Article not found");
        }

        return line.getQuantity();
    }




    public List<String> getArticleNamesByLocationAndLineNumber(String locationName, int lineNumber) {
        Location location = locationRepository.findByName(locationName);
        if (location == null) {
            throw new IllegalArgumentException("Location not found");
        }

        List<Line> lines = location.getLines();
        Line targetLine = null;

        for (Line line : lines) {
            if (line.getLineNumber() == lineNumber) {
                targetLine = line;
                break;
            }
        }

        if (targetLine == null) {
            throw new IllegalArgumentException("Line not found");
        }

        List<String> articleNames = new ArrayList<>();

        for (Line line : lines) {
            if (line.getLineNumber() == lineNumber && line.getArticle() != null) {
                articleNames.add(line.getArticle().getName());
            }
        }

        return articleNames;
    }



    public int getAppointmentDurationByLocationName(String locationName) {
        Location location = locationRepository.findByName(locationName);
        if (location == null) {
            throw new IllegalArgumentException("Location not found");
        }

        return location.getDuration();
    }



}
