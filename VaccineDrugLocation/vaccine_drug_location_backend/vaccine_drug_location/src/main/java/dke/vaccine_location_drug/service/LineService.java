package dke.vaccine_location_drug.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import dke.vaccine_location_drug.entity.Line;
import dke.vaccine_location_drug.entity.Article;
import dke.vaccine_location_drug.entity.Location;
import dke.vaccine_location_drug.repository.LineRepository;
import dke.vaccine_location_drug.repository.ArticleRepository;
import dke.vaccine_location_drug.repository.LocationRepository;

import java.util.List;

@Service
@Transactional
public class LineService {
    private final LineRepository lineRepository;
    private final LocationRepository locationRepository;
    private final ArticleRepository articleRepository;

    public LineService(LineRepository lineRepository, LocationRepository locationRepository, ArticleRepository articleRepository) {
        this.lineRepository = lineRepository;
        this.locationRepository = locationRepository;
        this.articleRepository = articleRepository;
    }

    public Line createLine(Long locationId, Long articleId, int quantity, Integer lineNumber, String type) {
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new IllegalArgumentException("Location not found"));

        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Article not found"));

        Line line = new Line();
        line.setLocation(location);
        line.setArticle(article);
        line.setQuantity(quantity);
        line.setLineNumber(lineNumber);
        line.setType(type);

        return lineRepository.save(line);
    }

    public Line updateLine(Long lineId, int quantity) {
        Line line = lineRepository.findById(lineId)
                .orElseThrow(() -> new IllegalArgumentException("Line not found"));

        line.setQuantity(quantity);

        return lineRepository.save(line);
    }

    public void deleteLine(Long lineId) {
        lineRepository.deleteById(lineId);
    }

    public List<Line> getAllLines() {
        return lineRepository.findAll();
    }

    public List<Line> searchLinesByQuantityGreaterThan(int quantity) {
        return lineRepository.findByQuantityGreaterThan(quantity);
    }

    public List<Line> searchLinesByQuantityEqualsZero() {
        return lineRepository.findByQuantityEquals(0);
    }

    public List<Line> searchLinesByArticleType(String articleType) {
        return lineRepository.findByArticleTypeIgnoreCase(articleType);
    }

    public void decreaseQuantity(Long lineId) {
        Line line = lineRepository.findById(lineId)
                .orElseThrow(() -> new IllegalArgumentException("Line not found"));
        if (line.getQuantity() > 0) {
            line.setQuantity(line.getQuantity() - 1);
            lineRepository.save(line);
        }
    }

    public void increaseQuantity(Long lineId) {
        Line line = lineRepository.findById(lineId)
                .orElseThrow(() -> new IllegalArgumentException("Line not found"));
        line.setQuantity(line.getQuantity() + 1);
        lineRepository.save(line);
    }

    public Line getLineByLocationNameAndLineNumber(String locationName, int lineNumber) {
        return lineRepository.findByLocationNameAndLineNumber(locationName, lineNumber);
    }


}
