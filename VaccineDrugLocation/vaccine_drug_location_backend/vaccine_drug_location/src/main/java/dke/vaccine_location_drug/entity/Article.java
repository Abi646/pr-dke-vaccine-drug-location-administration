package dke.vaccine_location_drug.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "article")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "min_age", nullable = false)
    private int minAge;

    @Column(name = "max_age", nullable = false)
    private int maxAge;

    @Column(nullable = false)
    private String type;

    @JsonIgnore
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Inventory> inventories = new HashSet<>();

    // Standardkonstruktor, Getter und Setter

    public Article() {
    }

    public Article(String name, int minAge, int maxAge, String type) {
        this.name = name;
        this.minAge = minAge;
        this.maxAge = maxAge;
        this.type = type;
    }

    // Weitere Getter und Setter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Inventory> getInventories() {
        return inventories;
    }

    public void setInventories(Set<Inventory> inventories) {
        this.inventories = inventories;
    }

    public void addInventory(Inventory inventory) {
        inventories.add(inventory);
        inventory.setArticle(this);
    }

    public void removeInventory(Inventory inventory) {
        inventories.remove(inventory);
        inventory.setArticle(null);
    }
    public Inventory getInventory() {
        return inventories.stream().findFirst().orElse(null);
    }
}
