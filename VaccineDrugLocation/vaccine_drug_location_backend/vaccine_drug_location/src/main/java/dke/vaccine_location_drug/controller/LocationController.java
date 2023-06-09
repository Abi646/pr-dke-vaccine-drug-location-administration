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

    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable int id) {
        Location location = locationService.getLocationById(id);
        return new ResponseEntity<>(location, HttpStatus.OK);
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
    public ResponseEntity<List<String>> searchLocationsWithQuantity(@PathVariable String county) {
        List<String> locationNames = locationService.searchLocationsWithQuantity(county);
        return ResponseEntity.ok(locationNames);
    }


    @GetMapping("/{locationName}/lines")
    public ResponseEntity<List<Integer>> getLinesWithQuantityByLocation(@PathVariable String locationName) {
        List<Integer> lineNumbers = locationService.getLinesWithQuantityByLocationName(locationName);
        return ResponseEntity.ok(lineNumbers);
    }


    @GetMapping("/{locationName}/line/{lineNumber}/articles/{name}")
    public ResponseEntity<Integer> getArticleQuantityByLocationAndLineNumberAndName(@PathVariable String locationName, @PathVariable int lineNumber, @PathVariable String name) {
        int articleQuantity = locationService.getArticleQuantityByLocationAndLineNumberAndName(locationName, lineNumber, name);
        return ResponseEntity.ok(articleQuantity);
    }


    @GetMapping("/{locationName}/line/{lineNumber}/articles")
    public ResponseEntity<List<String>> getArticleNamesByLocationAndLineNumber(
            @PathVariable String locationName,
            @PathVariable int lineNumber
    ) {
        List<String> articleNames = locationService.getArticleNamesByLocationAndLineNumber(locationName, lineNumber);
        return ResponseEntity.ok(articleNames);
    }




    @GetMapping("/{locationName}/duration")
    public ResponseEntity<Integer> getAppointmentDurationByLocationName(@PathVariable String locationName) {
        int duration = locationService.getAppointmentDurationByLocationName(locationName);
        return ResponseEntity.ok(duration);
    }



}
