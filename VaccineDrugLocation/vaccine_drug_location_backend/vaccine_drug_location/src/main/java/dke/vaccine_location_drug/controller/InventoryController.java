package dke.vaccine_location_drug.controller;

import dke.vaccine_location_drug.entity.Inventory;
import dke.vaccine_location_drug.entity.Location;
import dke.vaccine_location_drug.service.InventoryService;
import dke.vaccine_location_drug.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    private final InventoryService inventoryService;
    private final LocationService locationService;

    @Autowired
    public InventoryController(InventoryService inventoryService, LocationService locationService) {
        this.inventoryService = inventoryService;
        this.locationService = locationService;
    }

    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventory() {
        List<Inventory> inventory = inventoryService.getAllInventory();
        return new ResponseEntity<>(inventory, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventoryById(@PathVariable int id) {
        Inventory inventory = inventoryService.getInventoryById(id);
        return new ResponseEntity<>(inventory, HttpStatus.OK);
    }

    @PostMapping("/location/{locationId}")
    public ResponseEntity<Inventory> createInventoryForLocation(@PathVariable int locationId, @RequestBody Inventory inventory) {
        Location location = locationService.getLocationById(locationId);
        if (location == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        inventory.setLocation(location);
        try {
            Inventory savedInventory = inventoryService.saveInventory(inventory);
            return new ResponseEntity<>(savedInventory, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable int id, @RequestBody Inventory updatedInventory) {
        Inventory inventory = inventoryService.getInventoryById(id);
        if (inventory == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        inventory.setArticle(updatedInventory.getArticle());
        inventory.setQuantity(updatedInventory.getQuantity());
        try {
            Inventory updatedInventoryEntity = inventoryService.saveInventory(inventory);
            return new ResponseEntity<>(updatedInventoryEntity, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable int id) {
        inventoryService.deleteInventory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
