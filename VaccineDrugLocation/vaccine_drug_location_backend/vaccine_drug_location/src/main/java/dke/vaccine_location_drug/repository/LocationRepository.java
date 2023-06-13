package dke.vaccine_location_drug.repository;

import dke.vaccine_location_drug.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Integer> {
}
