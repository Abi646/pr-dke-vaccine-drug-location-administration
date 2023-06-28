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

    // Erstellt eine Warteschlange für eine bestimmte Standort-ID, Artikel-ID und Menge
    public Line createLine(Long locationId, Long articleId, int quantity, Integer lineNumber, String type) {
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new IllegalArgumentException("Standort wurde nicht gefunden"));

        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Artikel wurde nicht gefunden"));

        if (quantity > article.getStock()) {
            throw new IllegalArgumentException("Überschreitet aktuelles Kontingent des Artikels");
        }

        Line line = new Line();
        line.setLocation(location);
        line.setArticle(article);
        line.setQuantity(quantity);
        line.setLineNumber(lineNumber);
        line.setType(type);

        return lineRepository.save(line);
    }

    // Ruft eine Warteschlange anhand der ID ab
    public Line getLineById(long id) {
        return lineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Linie mit der mit der ID: " + id + " nicht gefunden"));
    }

    // Aktualisiert eine Warteschlange mit einer neuen Menge
    public Line updateLine(Long lineId, int quantity) {
        Line line = lineRepository.findById(lineId)
                .orElseThrow(() -> new IllegalArgumentException("Linie nicht gefunden"));

        line.setQuantity(quantity);

        return lineRepository.save(line);
    }

    // Löscht eine Warteschlange anhand der ID
    public void deleteLine(Long lineId) {
        lineRepository.deleteById(lineId);
    }

    // Ruft alle Warteschlangen ab
    public List<Line> getAllLines() {
        return lineRepository.findAll();
    }

    // Sucht Warteschlangen mit einer größeren Menge als die angegebene Menge
    public List<Line> searchLinesByQuantityGreaterThan(int quantity) {
        return lineRepository.findByQuantityGreaterThan(quantity);
    }

    // Sucht Warteschlangen mit einer Menge von null
    public List<Line> searchLinesByQuantityEqualsZero() {
        return lineRepository.findByQuantityEquals(0);
    }

    // Sucht Warteschlangen anhand des Artikeltyps
    public List<Line> searchLinesByArticleType(String articleType) {
        return lineRepository.findByArticleTypeIgnoreCase(articleType);
    }

    // Verringert die Menge einer Warteschlange um 1
    public void decreaseQuantity(Long lineId) {
        Line line = lineRepository.findById(lineId)
                .orElseThrow(() -> new IllegalArgumentException("Linie nicht gefunden"));
        if (line.getQuantity() > 0) {
            line.setQuantity(line.getQuantity() - 1);
            lineRepository.save(line);
        }
    }

    // Erhöht die Menge einer Warteschlange um 1
    public void increaseQuantity(Long lineId) {
        Line line = lineRepository.findById(lineId)
                .orElseThrow(() -> new IllegalArgumentException("Linie nicht gefunden"));
        line.setQuantity(line.getQuantity() + 1);
        lineRepository.save(line);
    }

    // Ruft eine Warteschlange anhand des Standortnamens und der Zeilennummer ab
    public Line getLineByLocationNameAndLineNumber(String locationName, int lineNumber) {
        return lineRepository.findByLocationNameAndLineNumber(locationName, lineNumber);
    }
}
