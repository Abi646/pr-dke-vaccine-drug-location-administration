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

    // Erstellt einen Standort und speichert ihn in der Datenbank
    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    // Aktualisiert einen Standort mit den übergebenen Daten
    public Location updateLocation(Long locationId, Location updatedLocation) {
        Location existingLocation = locationRepository.findById(locationId)
                .orElseThrow(() -> new IllegalArgumentException("Standort wurde nicht gefunden"));

        existingLocation.setName(updatedLocation.getName());
        existingLocation.setCounty(updatedLocation.getCounty());
        existingLocation.setAddress(updatedLocation.getAddress());
        existingLocation.setType(updatedLocation.getType());

        return locationRepository.save(existingLocation);
    }

    // Löscht einen Standort anhand der ID
    public void deleteLocation(Long locationId) {
        locationRepository.deleteById(locationId);
    }

    // Ruft alle Standorte ab
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    // Ruft einen Standort anhand der ID ab
    public Location getLocationById(long id) {
        return locationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Standort mit der ID: " + id + "wurde nicht gefunden"));
    }

    // Sucht Standorte anhand des Landkreises
    public List<Location> searchLocationsByCounty(String county) {
        return locationRepository.findByCountyIgnoreCase(county);
    }

    // Sucht Standorte mit einer Menge größer als 0 für einen bestimmten Landkreis und gibt nur die Namen zurück
    public List<String> searchLocationsWithQuantity(String county) {
        List<Location> locations = locationRepository.findByCountyAndLinesQuantityGreaterThan(county, 0);
        return locations.stream()
                .map(Location::getName)
                .collect(Collectors.toList());
    }

    // Ruft die Zeilennummern von Warteschlangen ab, die eine Menge größer als 0 haben, für einen bestimmten Standortnamen
    public List<Integer> getLinesWithQuantityByLocationName(String locationName) {
        Location location = locationRepository.findByName(locationName);
        if (location == null) {
            throw new IllegalArgumentException("Standort wurde nicht gefunden");
        }

        return location.getLines().stream()
                .filter(line -> line.getQuantity() > 0)
                .map(Line::getLineNumber)
                .collect(Collectors.toList());
    }

    // Ruft die Menge eines Artikels anhand des Standortnamens, der Zeilennummer und des Artikelnamens ab
    public int getArticleQuantityByLocationAndLineNumberAndName(String locationName, int lineNumber, String articleName) {
        Location location = locationRepository.findByName(locationName);
        if (location == null) {
            throw new IllegalArgumentException("Standort wurde nicht gefunden");
        }

        Line line = location.getLines().stream()
                .filter(l -> l.getLineNumber() == lineNumber)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Linie wurde nicht gefunden"));

        Article article = line.getArticle();
        if (article == null || !article.getName().equalsIgnoreCase(articleName)) {
            throw new IllegalArgumentException("Artikel wurde nicht gefunden");
        }

        return line.getQuantity();
    }

    // Ruft die Artikelnamen ab, die einer bestimmten Zeilennummer eines Standorts zugeordnet sind
    public List<String> getArticleNamesByLocationAndLineNumber(String locationName, int lineNumber) {
        Location location = locationRepository.findByName(locationName);
        if (location == null) {
            throw new IllegalArgumentException("Standort wurde nicht gefunden");
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
            throw new IllegalArgumentException("Linie wurde nicht gefunden");
        }

        List<String> articleNames = new ArrayList<>();

        for (Line line : lines) {
            if (line.getLineNumber() == lineNumber && line.getArticle() != null) {
                articleNames.add(line.getArticle().getName());
            }
        }

        return articleNames;
    }

    // Ruft die Dauer eines Termins anhand des Standortnamens ab
    public int getAppointmentDurationByLocationName(String locationName) {
        Location location = locationRepository.findByName(locationName);
        if (location == null) {
            throw new IllegalArgumentException("Standort wurde nicht gefunden");
        }

        return location.getDuration();
    }
}
