package dke.vaccine_location_drug.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import dke.vaccine_location_drug.entity.Location;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    List<Location> findByCounty(String county);
    Location findByName(String name);
}
