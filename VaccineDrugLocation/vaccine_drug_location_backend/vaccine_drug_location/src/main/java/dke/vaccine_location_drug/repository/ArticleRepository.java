package dke.vaccine_location_drug.repository;

import dke.vaccine_location_drug.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByNameContainingIgnoreCase(String name);
    List<Article> findByTypeContainingIgnoreCase(String type);
}
