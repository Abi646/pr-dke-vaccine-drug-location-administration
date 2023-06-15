package dke.vaccine_location_drug.repository;

import dke.vaccine_location_drug.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import dke.vaccine_location_drug.entity.Location;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    //List<Article> findArticlesByLocationId(@Param("locationId") Long locationId);

    List<Location> findByCountyIgnoreCase(String county);

    List<Location> findByCountyAndLinesQuantityGreaterThan(String county, int i);
}
