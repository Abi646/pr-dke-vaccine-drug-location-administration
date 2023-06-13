package dke.vaccine_location_drug.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Table(name = "article")
@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private String name;

    @NotNull
    private ArticleType type;

    @NotNull
    private int minAge;

    @NotNull
    private int maxAge;

    public Article() {
    }

    public Article(int id, String name, ArticleType type, int minAge, int maxAge) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ArticleType getType() {
        return type;
    }

    public void setType(ArticleType type) {
        this.type = type;
    }

    public int getMinAge() {
        return minAge;
    }

    public void setMinAge(int minAge) {
        this.minAge = minAge;
    }

    public int getMaxAge() {
        return maxAge;
    }

    public void setMaxAge(int maxAge) {
        this.maxAge = maxAge;
    }
}
