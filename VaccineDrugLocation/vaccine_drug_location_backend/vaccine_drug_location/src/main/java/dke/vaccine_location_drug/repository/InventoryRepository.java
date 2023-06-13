package dke.vaccine_location_drug.repository;

import dke.vaccine_location_drug.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
}
