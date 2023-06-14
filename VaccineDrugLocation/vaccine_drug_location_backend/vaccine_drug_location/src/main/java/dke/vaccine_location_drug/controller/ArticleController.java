package dke.vaccine_location_drug.controller;

import dke.vaccine_location_drug.entity.Article;
import dke.vaccine_location_drug.entity.ArticleType;
import dke.vaccine_location_drug.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        List<Article> articles = articleService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

    @PostMapping
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        Article savedArticle = articleService.saveArticle(article);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable int id) {
        Article article = articleService.getArticleById(id);
        return ResponseEntity.ok(article);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable int id, @RequestBody Article updatedArticle) {
        if (updatedArticle.getId() != id) {
            return ResponseEntity.badRequest().build();
        }
        Article article = articleService.getArticleById(id);
        if (article == null) {
            return ResponseEntity.notFound().build();
        }
        article.setName(updatedArticle.getName());
        article.setType(updatedArticle.getType());
        article.setMinAge(updatedArticle.getMinAge());
        article.setMaxAge(updatedArticle.getMaxAge());
        Article updatedArticleEntity = articleService.saveArticle(article);
        return ResponseEntity.ok(updatedArticleEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable int id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
}
