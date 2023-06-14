package dke.vaccine_location_drug.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import dke.vaccine_location_drug.entity.Article;
import dke.vaccine_location_drug.repository.ArticleRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ArticleService {
    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public Article saveArticle(Article article) {
        return articleRepository.save(article);
    }

    public Article getArticleById(Long id) {
        return articleRepository.findById(id).orElse(null);
    }

    public Article getArticleByName(String name) {
        Optional<Article> optionalArticle = articleRepository.findByName(name);
        return optionalArticle.orElse(null);
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public void deleteArticleById(Long id) {
        articleRepository.deleteById(id);
    }

    public Article updateArticle(Article article) {
        Optional<Article> existingArticleOptional = articleRepository.findById(article.getId());
        if (existingArticleOptional.isPresent()) {
            Article existingArticle = existingArticleOptional.get();
            existingArticle.setName(article.getName());
            existingArticle.setMinAge(article.getMinAge());
            existingArticle.setMaxAge(article.getMaxAge());
            existingArticle.setType(article.getType());
            return articleRepository.save(existingArticle);
        }
        return null;
    }
}
