package dke.vaccine_location_drug.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String county;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false)
    private String type;

    @OneToOne(mappedBy = "location", cascade = CascadeType.ALL)
    @JsonIgnore
    private Inventory inventory;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Line> lines = new HashSet<>();

    // Standardkonstruktor, Getter und Setter

    public Location() {
    }

    public Location(String name, String address, String county, int duration, String type) {
        this.name = name;
        this.address = address;
        this.county = county;
        this.duration = duration;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public Set<Line> getLines() {
        return lines;
    }

    public void setLines(Set<Line> lines) {
        this.lines = lines;
    }

    public void addLine(Line line) {
        lines.add(line);
        line.setLocation(this);
    }
    public void removeLine(Line line) {
        lines.remove(line);
        line.setLocation(null);
    }
    public Line getLineById(Long id) {
        for (Line line : lines) {
            if (line.getId().equals(id)) {
                return line;
            }
        }
        return null;
    }
}
