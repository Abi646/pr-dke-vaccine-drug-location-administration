package dke.vaccine_location_drug.controller;

import dke.vaccine_location_drug.entity.Article;
import dke.vaccine_location_drug.entity.Line;
import dke.vaccine_location_drug.service.LineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return new ResponseEntity<>(lines, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Line> getLineById(@PathVariable int id) {
        Line line = lineService.getLineById(id);
        return new ResponseEntity<>(line, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Line> createLine(@RequestBody Line line) {
        Line savedLine = lineService.saveLine(line);
        return new ResponseEntity<>(savedLine, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLine(@PathVariable int id) {
        lineService.deleteLine(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{lineId}/articles")
    public ResponseEntity<Line> assignArticlesToLine(@PathVariable int lineId, @RequestBody List<Article> articles) {
        Line line = lineService.getLineById(lineId);
        if (line == null) {
            return ResponseEntity.notFound().build();
        }
        line.setDedicatedArticle((Article) articles);
        Line updatedLine = lineService.saveLine(line);
        return ResponseEntity.ok(updatedLine);
    }


}
