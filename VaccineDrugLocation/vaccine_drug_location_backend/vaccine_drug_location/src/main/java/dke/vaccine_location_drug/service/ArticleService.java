package dke.vaccine_location_drug.service;

import dke.vaccine_location_drug.entity.Line;
import dke.vaccine_location_drug.repository.LineRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import dke.vaccine_location_drug.entity.Article;
import dke.vaccine_location_drug.repository.ArticleRepository;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final LineRepository lineRepository;


    public ArticleService(ArticleRepository articleRepository,LineRepository lineRepository) {
        this.articleRepository = articleRepository;
        this.lineRepository = lineRepository;
    }

    public Article createArticle(Article article) {
        return articleRepository.save(article);
    }

    public Article getArticleById(long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found with id: " + id));
    }

    public Article updateArticle(Long articleId, Article updatedArticle) {
        Article existingArticle = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Article not found"));

        existingArticle.setName(updatedArticle.getName());
        existingArticle.setMinAge(updatedArticle.getMinAge());
        existingArticle.setMaxAge(updatedArticle.getMaxAge());
        existingArticle.setType(updatedArticle.getType());
        existingArticle.setStock(updatedArticle.getStock());

        return articleRepository.save(existingArticle);
    }


    public void deleteArticle(Long articleId) {
        articleRepository.deleteById(articleId);
    }

    public List<Article> searchArticlesByName(String name) {
        return articleRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Article> searchArticlesByType(String type) {
        return articleRepository.findByTypeContainingIgnoreCase(type);
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public Article addArticleToLine(Long articleId, Long lineId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("Article not found"));

        Line line = lineRepository.findById(lineId)
                .orElseThrow(() -> new IllegalArgumentException("Line not found"));

        line.setArticle(article);
        lineRepository.save(line);

        return article;
    }
}