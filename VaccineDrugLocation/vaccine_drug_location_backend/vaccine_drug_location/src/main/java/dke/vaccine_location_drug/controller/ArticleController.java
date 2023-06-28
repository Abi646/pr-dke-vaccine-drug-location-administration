package dke.vaccine_location_drug.controller;

import dke.vaccine_location_drug.entity.Article;
import dke.vaccine_location_drug.service.ArticleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articles")
public class ArticleController {
    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        Article createdArticle = articleService.createArticle(article);
        return new ResponseEntity<>(createdArticle, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable int id) {
        Article article = articleService.getArticleById(id);
        return ResponseEntity.ok(article);
    }

    @PutMapping("/{articleId}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long articleId, @RequestBody Article updatedArticle) {
        Article updated = articleService.updateArticle(articleId, updatedArticle);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{articleId}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long articleId) {
        articleService.deleteArticle(articleId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        List<Article> articles = articleService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Article>> searchArticlesByName(@RequestParam("name") String name) {
        List<Article> articles = articleService.searchArticlesByName(name);
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/searchByType")
    public ResponseEntity<List<Article>> searchArticlesByType(@RequestParam("type") String type) {
        List<Article> articles = articleService.searchArticlesByType(type);
        return ResponseEntity.ok(articles);
    }

    @PostMapping("/{articleId}/lines/{lineId}")
    public ResponseEntity<Article> addArticleToLine(@PathVariable Long articleId, @PathVariable Long lineId) {
        Article article = articleService.addArticleToLine(articleId, lineId);
        return ResponseEntity.ok(article);
    }
    @GetMapping("/{id}/stock")
    public ResponseEntity<Integer> getArticleStock(@PathVariable Long id) {
        int stock = articleService.getArticleStock(id);
        return ResponseEntity.ok(stock);
    }
}
