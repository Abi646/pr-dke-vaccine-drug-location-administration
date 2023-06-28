package dke.vaccine_location_drug.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Line {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long line_id;

    private Integer lineNumber;
    private String type;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    // Getter und Setter

    public Long getId() {
        return line_id;
    }

    public void setId(Long id) {
        this.line_id = id;
    }

    public Integer getLineNumber() {
        return lineNumber;
    }

    public void setLineNumber(Integer lineNumber) {
        this.lineNumber = lineNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

}
