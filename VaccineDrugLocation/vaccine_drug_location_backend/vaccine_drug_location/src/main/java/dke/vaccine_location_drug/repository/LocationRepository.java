package dke.vaccine_location_drug.repository;

import dke.vaccine_location_drug.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Integer> {
    List<Location> findByCounty(String district);
}
