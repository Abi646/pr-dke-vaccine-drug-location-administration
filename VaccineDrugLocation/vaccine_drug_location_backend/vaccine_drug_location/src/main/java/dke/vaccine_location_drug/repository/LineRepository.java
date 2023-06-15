package dke.vaccine_location_drug.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import dke.vaccine_location_drug.entity.Line;
import dke.vaccine_location_drug.entity.Location;

import java.util.List;
import java.util.Set;

@Repository
public interface LineRepository extends JpaRepository<Line, Long> {
    List<Line> findByQuantityGreaterThan(int quantity);

    List<Line> findByQuantityEquals(int i);

    List<Line> findByArticleTypeIgnoreCase(String articleType);

    Line findByLocationNameAndLineNumber(String locationName, int lineNumber);

}