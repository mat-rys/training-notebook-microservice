package com.example.body.body.service;

import com.example.body.body.entitie.BodyMeasurement;

import java.util.List;

public interface BodyMeasurementService {
    BodyMeasurement addMeasurement(BodyMeasurement measurement);
    List<BodyMeasurement> getMeasurementsByUserId(String userId);
    BodyMeasurement updateMeasurement(BodyMeasurement measurement);
    void deleteMeasurement(Long measurementId);

    BodyMeasurement getMeasurementById(Long id);
}
