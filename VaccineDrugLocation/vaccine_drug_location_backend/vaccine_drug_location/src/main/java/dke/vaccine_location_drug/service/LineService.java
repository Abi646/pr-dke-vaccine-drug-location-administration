package dke.vaccine_location_drug.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import dke.vaccine_location_drug.entity.Line;
import dke.vaccine_location_drug.entity.Article;
import dke.vaccine_location_drug.entity.Location;
import dke.vaccine_location_drug.repository.LineRepository;
import dke.vaccine_location_drug.repository.ArticleRepository;
import dke.vaccine_location_drug.repository.LocationRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class LineService {
    private final LineRepository lineRepository;
    private final ArticleRepository articleRepository;
    private final LocationRepository locationRepository;

    @Autowired
    public LineService(LineRepository lineRepository, ArticleRepository articleRepository, LocationRepository locationRepository) {
        this.lineRepository = lineRepository;
        this.articleRepository = articleRepository;
        this.locationRepository = locationRepository;
    }

    public Line saveLine(Line line) {
        return lineRepository.save(line);
    }

    public Line getLineById(Long id) {
        return lineRepository.findById(id).orElse(null);
    }

    public List<Line> getAllLines() {
        return lineRepository.findAll();
    }

    public void deleteLineById(Long id) {
        lineRepository.deleteById(id);
    }

    public void addArticleToLine(Line line, Article article) {
        line.setArticle(article);
        lineRepository.save(line);
    }

    public Set<Article> getArticlesByLocation(Location location) {
        Set<Article> articles = new HashSet<>();
        Set<Line> lines = lineRepository.findByLocation(location);
        for (Line line : lines) {
            Article article = line.getArticle();
            articles.add(article);
        }
        return articles;
    }

    public Location getLocationById(Long id) {
        return locationRepository.findById(id).orElse(null);
    }

    public Article getArticleById(Long id) {
        return articleRepository.findById(id).orElse(null);
    }
}
