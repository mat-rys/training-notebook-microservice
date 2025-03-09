package com.example.body.body.service;

import com.example.body.body.entitie.BodyMeasurement;
import com.example.body.body.repository.BodyMeasurementRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BodyMeasurementServiceImpl implements BodyMeasurementService {

    private final BodyMeasurementRepo bodyMeasurementRepo;

    @Override
    public BodyMeasurement addMeasurement(BodyMeasurement measurement) {
        return bodyMeasurementRepo.save(measurement);
    }

    @Override
    public List<BodyMeasurement> getMeasurementsByUserId(String userId) {
        return bodyMeasurementRepo.findByBodyProfile_IdUser(userId);
    }

    @Override
    public BodyMeasurement updateMeasurement(BodyMeasurement measurement) {
        Optional<BodyMeasurement> existingMeasurement = bodyMeasurementRepo.findById(measurement.getId());
        if (existingMeasurement.isPresent()) {
            return bodyMeasurementRepo.save(measurement);
        } else {
            throw new IllegalArgumentException("Measurement not found");
        }
    }

    @Override
    public void deleteMeasurement(Long measurementId) {
        bodyMeasurementRepo.deleteById(measurementId);
    }

    @Override
    public BodyMeasurement getMeasurementById(Long id) {
        return bodyMeasurementRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Measurement not found with id: " + id));
    }
}