package dke.vaccine_location_drug.service;

import dke.vaccine_location_drug.entity.Line;
import dke.vaccine_location_drug.repository.LineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LineService {

    private final LineRepository lineRepository;

    @Autowired
    public LineService(LineRepository lineRepository) {
        this.lineRepository = lineRepository;
    }

    public List<Line> getAllLines() {
        return lineRepository.findAll();
    }

    public Line getLineById(int id) {
        return lineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Line not found with id: " + id));
    }

    public Line saveLine(Line line) {
        return lineRepository.save(line);
    }

    public void deleteLine(int id) {
        lineRepository.deleteById(id);
    }
}
