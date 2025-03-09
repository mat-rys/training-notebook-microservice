package com.example.body.body.controller;

import com.example.body.body.entitie.BodyMeasurement;
import com.example.body.body.entitie.BodyProfile;
import com.example.body.body.service.BodyMeasurementService;
import com.example.body.body.service.BodyProfileServiceImlp;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/body/measurements")
public class BodyMeasurementController {

    private final BodyMeasurementService bodyMeasurementService;
    private final BodyProfileServiceImlp bodyProfileServiceImlp;

    @PostMapping("/add")
    public ResponseEntity<BodyMeasurement> addMeasurement(@RequestBody BodyMeasurement measurement, Principal principal) {
        Optional<BodyProfile> bodyProfile = bodyProfileServiceImlp.getBodyProfileById(principal.getName());
        if (bodyProfile.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Body profile not found for user");
        }
        measurement.setBodyProfile(bodyProfile.get());
        return new ResponseEntity<>(bodyMeasurementService.addMeasurement(measurement), HttpStatus.CREATED);
    }

    @GetMapping("/user/userId")
    public ResponseEntity<List<BodyMeasurement>> getMeasurements(Principal principal) {
        List<BodyMeasurement> measurements = bodyMeasurementService.getMeasurementsByUserId(principal.getName());
        if (measurements.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(measurements, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<BodyMeasurement> updateMeasurement(@RequestBody BodyMeasurement measurement, Principal principal) {
        String username = principal.getName();
        Optional<BodyProfile> userProfile = bodyProfileServiceImlp.getBodyProfileById(username);
        BodyMeasurement existingMeasurement = bodyMeasurementService.getMeasurementById(measurement.getId());
        BeanUtils.copyProperties(measurement, existingMeasurement, "id", "bodyProfile");
        existingMeasurement.setBodyProfile(userProfile.get());
        BodyMeasurement updatedMeasurement = bodyMeasurementService.updateMeasurement(existingMeasurement);

        return new ResponseEntity<>(updatedMeasurement, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMeasurement(@PathVariable Long id) {
        bodyMeasurementService.deleteMeasurement(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}