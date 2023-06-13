package dke.vaccine_location_drug.service;

import dke.vaccine_location_drug.entity.Article;
import dke.vaccine_location_drug.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository repository;

    public List<Article> getAllArticles() {
        return repository.findAll();
    }

    public Article getArticleById(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found with id: " + id));
    }

    public void deleteArticle(int id) {
        repository.deleteById(id);
    }

    public Article saveArticle(Article article) {
        return repository.save(article);
    }

    public Article updateArticle(Article article) {
        Optional<Article> existingArticle = repository.findById(article.getId());
        if (existingArticle.isPresent()) {
            return repository.save(article);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found with id: " + article.getId(), null);
        }
    }
}
