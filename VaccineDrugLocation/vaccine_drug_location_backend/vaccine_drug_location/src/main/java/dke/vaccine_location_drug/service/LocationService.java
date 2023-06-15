package dke.vaccine_location_drug.service;

import dke.vaccine_location_drug.entity.Article;
import dke.vaccine_location_drug.entity.Inventory;
import dke.vaccine_location_drug.entity.Line;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import dke.vaccine_location_drug.entity.Location;
import dke.vaccine_location_drug.repository.LocationRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class LocationService {
    private final LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public Location saveLocation(Location location) {
        return locationRepository.save(location);
    }

    public Location getLocationById(Long id) {
        return locationRepository.findById(id).orElse(null);
    }

    public List<Location> getAllLocationsByCounty(String county) {
        return locationRepository.findByCounty(county);
    }

    public List<Location> getStockLocationsByCounty(String county) {
        return locationRepository.findByCounty(county);
    }


    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public void deleteLocationById(Long id) {
        locationRepository.deleteById(id);
    }

    public Location updateLocation(Location location) {
        return locationRepository.save(location);
    }

    public List<Line> getLinesByLocationName(String name) {
        Location location = locationRepository.findByName(name);
        if (location != null) {
            Set<Line> lines = location.getLines();
            return new ArrayList<>(lines);
        } else {
            return null;
        }
    }

    public List<Article> getArticlesByLineAndLocation(String name, Long lineId) {
        Location location = locationRepository.findByName(name);
        if (location != null) {
            Line line = location.getLineById(lineId);
            if (line != null) {
                return line.getArticles();
            }
        }
        return null;
    }

    public boolean decreaseInventory(String name, Long lineId, String articleName) {
        Location location = locationRepository.findByName(name);
        if (location != null) {
            Line line = location.getLineById(lineId);
            if (line != null) {
                Article article = line.getArticleByName(articleName);
                if (article != null) {
                    Inventory inventory = article.getInventory();
                    if (inventory != null) {
                        int quantity = inventory.getQuantity();
                        if (quantity > 0) {
                            inventory.setQuantity(quantity - 1);
                            locationRepository.save(location); // Speichern der aktualisierten Location
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public boolean increaseInventory(String name, Long lineId, String articleName) {
        Location location = locationRepository.findByName(name);
        if (location != null) {
            Line line = location.getLineById(lineId);
            if (line != null) {
                Article article = line.getArticleByName(articleName);
                if (article != null) {
                    Inventory inventory = article.getInventory();
                    if (inventory != null) {
                        int quantity = inventory.getQuantity();
                        inventory.setQuantity(quantity + 1);
                        locationRepository.save(location); // Speichern der aktualisierten Location
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
