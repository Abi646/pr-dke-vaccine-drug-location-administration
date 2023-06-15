package dke.vaccine_location_drug.controller;

import dke.vaccine_location_drug.entity.Article;
import dke.vaccine_location_drug.entity.Line;
import dke.vaccine_location_drug.entity.Location;
import dke.vaccine_location_drug.service.LocationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {
    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @PostMapping
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        Location createdLocation = locationService.createLocation(location);
        return new ResponseEntity<>(createdLocation, HttpStatus.CREATED);
    }

    @PutMapping("/{locationId}")
    public ResponseEntity<Location> updateLocation(@PathVariable Long locationId, @RequestBody Location updatedLocation) {
        Location updated = locationService.updateLocation(locationId, updatedLocation);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{locationId}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long locationId) {
        locationService.deleteLocation(locationId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationService.getAllLocations();
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/all/{county}")
    public ResponseEntity<List<Location>> searchLocationsByCounty(@PathVariable String county) {
        List<Location> locations = locationService.searchLocationsByCounty(county);
        return ResponseEntity.ok(locations);
    }


    @GetMapping("/stock/{county}")
    public ResponseEntity<List<Location>> searchLocationsWithQuantity(@PathVariable String county) {
        List<Location> locations = locationService.searchLocationsWithQuantity(county);
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/{locationId}/lines")
    public ResponseEntity<List<Line>> getLinesWithQuantityByLocation(@PathVariable Long locationId) {
        List<Line> lines = locationService.getLinesWithQuantityByLocation(locationId);
        return ResponseEntity.ok(lines);
    }

    @GetMapping("/{locationId}/line/{lineId}/name")
    public ResponseEntity<List<String>> getArticleNamesByLocationAndLine(@PathVariable Long locationId, @PathVariable Long lineId) {
        List<String> articleNames = locationService.getArticleNamesByLocationAndLine(locationId, lineId);
        return ResponseEntity.ok(articleNames);
    }
    @GetMapping("/{locationId}/articles")
    public ResponseEntity<List<Article>> getArticlesByLocation(@PathVariable Long locationId) {
        List<Article> articles = locationService.getArticlesByLocation(locationId);
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/{locationName}/duration")
    public ResponseEntity<Integer> getAppointmentDurationByLocationName(@PathVariable String locationName) {
        int duration = locationService.getAppointmentDurationByLocationName(locationName);
        return ResponseEntity.ok(duration);
    }



}
