package dke.vaccine_location_drug.entity;

import jakarta.persistence.*;


@Entity
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long article_id;
    private String name;
    private int minAge;
    private int maxAge;
    private String type;

    // Getter und Setter

    public Long getId() {
        return article_id;
    }

    public void setId(Long id) {
        this.article_id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    // Weitere Methoden und Annotationen nach Bedarf
}
