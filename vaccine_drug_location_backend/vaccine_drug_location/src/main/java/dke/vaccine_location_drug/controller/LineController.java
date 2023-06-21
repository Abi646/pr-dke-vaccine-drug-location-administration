package dke.vaccine_location_drug.controller;

import dke.vaccine_location_drug.entity.Line;
import dke.vaccine_location_drug.service.LineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lines")
public class LineController {
    private final LineService lineService;

    public LineController(LineService lineService) {
        this.lineService = lineService;
    }

    @PostMapping
    public ResponseEntity<Line> createLine(@RequestBody Line line) {
        Line createdLine = lineService.createLine(line.getLocation().getId(), line.getArticle().getId(), line.getQuantity(), line.getLineNumber(), line.getType());
        return new ResponseEntity<>(createdLine, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Line> getLineById(@PathVariable long id) {
        Line line = lineService.getLineById(id);
        return new ResponseEntity<>(line, HttpStatus.OK);
    }

    @PutMapping("/{lineId}")
    public ResponseEntity<Line> updateLine(@PathVariable Long lineId, @RequestBody Line updatedLine) {
        Line updated = lineService.updateLine(lineId, updatedLine.getQuantity());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{lineId}")
    public ResponseEntity<Void> deleteLine(@PathVariable Long lineId) {
        lineService.deleteLine(lineId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Line>> getAllLines() {
        List<Line> lines = lineService.getAllLines();
        return ResponseEntity.ok(lines);
    }

    @GetMapping("/searchByQuantityGreaterThan")
    public ResponseEntity<List<Line>> searchLinesByQuantityGreaterThan(@RequestParam("quantity") int quantity) {
        List<Line> lines = lineService.searchLinesByQuantityGreaterThan(quantity);
        return ResponseEntity.ok(lines);
    }

    @GetMapping("/searchByQuantityEqualsZero")
    public ResponseEntity<List<Line>> searchLinesByQuantityEqualsZero() {
        List<Line> lines = lineService.searchLinesByQuantityEqualsZero();
        return ResponseEntity.ok(lines);
    }

    @GetMapping("/searchByArticleType")
    public ResponseEntity<List<Line>> searchLinesByArticleType(@RequestParam("articleType") String articleType) {
        List<Line> lines = lineService.searchLinesByArticleType(articleType);
        return ResponseEntity.ok(lines);
    }

    @PostMapping("/create-appointment/{location}/line/{line}")
    public ResponseEntity<String> decreaseQuantityByAppointment(@PathVariable("location") String locationName, @PathVariable("line") int lineNumber, @RequestBody String articleName) {
        Line line = lineService.getLineByLocationNameAndLineNumber(locationName, lineNumber);
        if (line != null && line.getArticle().getName().equalsIgnoreCase(articleName)) {
            lineService.decreaseQuantity(line.getId());
            return ResponseEntity.ok("Kontingent verringert");
        }
        return ResponseEntity.badRequest().body("Ungültige Anfrage");
    }

    @PostMapping("/set-free/{location}/line/{line}")
    public ResponseEntity<String> increaseQuantityByCancellation(@PathVariable("location") String locationName, @PathVariable("line") int lineNumber, @RequestBody String articleName) {
        Line line = lineService.getLineByLocationNameAndLineNumber(locationName, lineNumber);
        if (line != null && line.getArticle().getName().equalsIgnoreCase(articleName)) {
            lineService.increaseQuantity(line.getId());
            return ResponseEntity.ok("Kontingent erhöht");
        }
        return ResponseEntity.badRequest().body("Ungültige Anfrage");
    }


}
