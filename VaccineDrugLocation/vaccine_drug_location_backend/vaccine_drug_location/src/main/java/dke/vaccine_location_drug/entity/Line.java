package dke.vaccine_location_drug.entity;

import jakarta.persistence.*;

@Entity
public class Line {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dedicated_article_id")
    private Article dedicatedArticle;

    public Line() {
    }

    public Line(Location location, Article dedicatedArticle) {
        this.location = location;
        this.dedicatedArticle = dedicatedArticle;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Article getDedicatedArticle() {
        return dedicatedArticle;
    }

    public void setDedicatedArticle(Article dedicatedArticle) {
        this.dedicatedArticle = dedicatedArticle;
    }
}