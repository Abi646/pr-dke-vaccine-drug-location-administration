package dke.vaccine_location_drug.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dke.vaccine_location_drug.entity.Line;
import dke.vaccine_location_drug.entity.Article;
import dke.vaccine_location_drug.entity.Location;
import dke.vaccine_location_drug.service.LineService;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/lines")
public class LineController {
    private final LineService lineService;

    @Autowired
    public LineController(LineService lineService) {
        this.lineService = lineService;
    }

    @GetMapping
    public ResponseEntity<List<Line>> getAllLines() {
        List<Line> lines = lineService.getAllLines();
        return ResponseEntity.ok(lines);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Line> getLineById(@PathVariable Long id) {
        Line line = lineService.getLineById(id);
        if (line != null) {
            return ResponseEntity.ok(line);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Line> createLine(@RequestBody Line line) {
        Line createdLine = lineService.saveLine(line);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Line> updateLine(@PathVariable Long id, @RequestBody Line line) {
        Line existingLine = lineService.getLineById(id);
        if (existingLine != null) {
            line.setId(id);
            Line updatedLine = lineService.saveLine(line);
            return ResponseEntity.ok(updatedLine);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLine(@PathVariable Long id) {
        Line existingLine = lineService.getLineById(id);
        if (existingLine != null) {
            lineService.deleteLineById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{lineId}/articles/{articleId}")
    public ResponseEntity<Void> addArticleToLine(@PathVariable Long lineId, @PathVariable Long articleId) {
        Line line = lineService.getLineById(lineId);
        Article article = lineService.getArticleById(articleId);
        if (line != null && article != null) {
            lineService.addArticleToLine(line, article);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{locationId}/articles")
    public ResponseEntity<Set<Article>> getArticlesByLocation(@PathVariable Long locationId) {
        Location location = lineService.getLocationById(locationId);
        if (location != null) {
            Set<Article> articles = lineService.getArticlesByLocation(location);
            return ResponseEntity.ok(articles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
