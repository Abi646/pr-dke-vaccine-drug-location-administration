package dke.vaccine_location_drug.controller;

import dke.vaccine_location_drug.entity.Article;
import dke.vaccine_location_drug.entity.Line;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dke.vaccine_location_drug.entity.Location;
import dke.vaccine_location_drug.service.LocationService;
import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {
    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationService.getAllLocations();
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable Long id) {
        Location location = locationService.getLocationById(id);
        if (location != null) {
            return ResponseEntity.ok(location);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all/{county}")
    public ResponseEntity<List<Location>> getAllLocationsByCounty(@PathVariable String county) {
        List<Location> locations = locationService.getAllLocationsByCounty(county);
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/stock/{county}")
    public ResponseEntity<List<Location>> getStockLocationsByCounty(@PathVariable String county) {
        List<Location> locations = locationService.getStockLocationsByCounty(county);
        return ResponseEntity.ok(locations);
    }

    @PostMapping
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        Location createdLocation = locationService.saveLocation(location);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLocation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable Long id, @RequestBody Location location) {
        Location existingLocation = locationService.getLocationById(id);
        if (existingLocation != null) {
            location.setId(id);
            Location updatedLocation = locationService.updateLocation(location);
            return ResponseEntity.ok(updatedLocation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        Location existingLocation = locationService.getLocationById(id);
        if (existingLocation != null) {
            locationService.deleteLocationById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{name}/lines")
    public ResponseEntity<List<Line>> getLinesByLocation(@PathVariable String name) {
        List<Line> lines = locationService.getLinesByLocationName(name);
        return ResponseEntity.ok(lines);
    }

    @GetMapping("/{name}/line/{lineId}/articles")
    public ResponseEntity<List<Article>> getArticlesByLineAndLocation(
            @PathVariable String name,
            @PathVariable Long lineId
    ) {
        List<Article> articles = locationService.getArticlesByLineAndLocation(name, lineId);
        return ResponseEntity.ok(articles);
    }

    @PostMapping("/create-appointment/{name}/line/{lineId}")
    public ResponseEntity<Void> decreaseInventory(
            @PathVariable String name,
            @PathVariable Long lineId,
            @RequestBody String articleName
    ) {
        boolean success = locationService.decreaseInventory(name, lineId, articleName);
        if (success) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/set-free/{name}/line/{lineId}")
    public ResponseEntity<Void> increaseInventory(
            @PathVariable String name,
            @PathVariable Long lineId,
            @RequestBody String articleName
    ) {
        boolean success = locationService.increaseInventory(name, lineId, articleName);
        if (success) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
