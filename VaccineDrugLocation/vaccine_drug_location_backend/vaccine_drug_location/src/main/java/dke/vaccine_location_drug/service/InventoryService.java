package dke.vaccine_location_drug.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import dke.vaccine_location_drug.entity.Inventory;
import dke.vaccine_location_drug.repository.InventoryRepository;

import java.util.List;

@Service
@Transactional
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public Inventory saveInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public Inventory getInventoryById(Long id) {
        return inventoryRepository.findById(id).orElse(null);
    }

    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    public void deleteInventoryById(Long id) {
        inventoryRepository.deleteById(id);
    }

    public Inventory getInventoryByLocationId(Long locationId) {
        return inventoryRepository.findByLocationId(locationId);
    }
}
