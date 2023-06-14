package dke.vaccine_location_drug.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import dke.vaccine_location_drug.entity.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Inventory findByLocationId(Long locationId);
}