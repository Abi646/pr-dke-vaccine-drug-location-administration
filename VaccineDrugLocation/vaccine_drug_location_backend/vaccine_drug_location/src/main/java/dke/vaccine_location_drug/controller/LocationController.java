package dke.vaccine_location_drug.controller;

import dke.vaccine_location_drug.entity.Inventory;
import dke.vaccine_location_drug.entity.Line;
import dke.vaccine_location_drug.entity.Location;
import dke.vaccine_location_drug.service.InventoryService;
import dke.vaccine_location_drug.service.LineService;
import dke.vaccine_location_drug.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {

    private final LocationService locationService;
    private final LineService lineService;
    private final InventoryService inventoryService;

    @Autowired
    public LocationController(LocationService locationService, LineService lineService, InventoryService inventoryService) {
        this.locationService = locationService;
        this.lineService = lineService;
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationService.getAllLocations();
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/{county}")
    public ResponseEntity<List<Location>> getLocationsByCounty(@PathVariable String county) {
        List<Location> locations = locationService.getLocationsByCounty(county);
        if (locations.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(locations);
    }

    @PostMapping
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        Inventory inventory = new Inventory();
        inventory.setLocation(location);

        Location savedLocation = locationService.saveLocation(location);
        inventoryService.saveInventory(inventory);

        return new ResponseEntity<>(savedLocation, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable int id, @RequestBody Location updatedLocation) {
        Location location = locationService.getLocationById(id);
        if (location == null) {
            return ResponseEntity.notFound().build();
        }
        location.setName(updatedLocation.getName());
        location.setAddress(updatedLocation.getAddress());
        location.setCounty(updatedLocation.getCounty());
        location.setType(updatedLocation.getType());
        location.setLines(updatedLocation.getLines());
        location.setInventory(updatedLocation.getInventory());
        Location updatedLocationEntity = locationService.saveLocation(location);
        return ResponseEntity.ok(updatedLocationEntity);
    }

    @PostMapping("/{locationId}/lines")
    public ResponseEntity<Line> createLineForLocation(@PathVariable int locationId, @RequestBody Line line) {
        Location location = locationService.getLocationById(locationId);
        if (location == null) {
            return ResponseEntity.notFound().build();
        }
        line.setLocation(location);
        Line savedLine = lineService.saveLine(line);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLine);
    }

    @PutMapping("/{locationId}/lines")
    public ResponseEntity<Location> assignLinesToLocation(
            @PathVariable int locationId,
            @RequestBody List<Line> lines
    ) {
        Location location = locationService.getLocationById(locationId);
        if (location == null) {
            return ResponseEntity.notFound().build();
        }

        location.setLines(lines);
        Location updatedLocation = locationService.saveLocation(location);

        return ResponseEntity.ok(updatedLocation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable int id) {
        locationService.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }
}
