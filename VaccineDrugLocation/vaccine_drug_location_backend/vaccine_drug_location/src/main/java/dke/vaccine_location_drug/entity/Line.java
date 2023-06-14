package dke.vaccine_location_drug.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "line")
public class Line {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    // Standardkonstruktor, Getter und Setter

    public Line() {
    }

    public Line(Location location, Article article) {
        this.location = location;
        this.article = article;
    }

    // Weitere Getter und Setter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Article getArticleByName(String name) {
        if (article.getName().equalsIgnoreCase(name)) {
            return article;
        }
        return null;
    }

    public List<Article> getArticles() {
        List<Article> articles = new ArrayList<>();
        articles.add(article);
        return articles;
    }
}
