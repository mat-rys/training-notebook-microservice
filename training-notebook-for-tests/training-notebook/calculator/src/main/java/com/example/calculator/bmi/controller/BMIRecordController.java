package com.example.calculator.bmi.controller;

import com.example.calculator.bmi.entitie.BMIRecord;
import com.example.calculator.bmi.service.BMIRecordService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@Slf4j
@RequestMapping("/calculator")
@AllArgsConstructor
public class BMIRecordController {

    private final BMIRecordService bmiRecordService;


    @GetMapping("/get/all")
    public ResponseEntity<List<BMIRecord>> getBMIRecords() {
        log.info("Received request to get all BMI records.");
        List<BMIRecord> bmiRecords = bmiRecordService.getBMIRecords();
        log.info("Returning {} BMI records.", bmiRecords.size());
        return ResponseEntity.ok().body(bmiRecords);
    }

    @GetMapping("/get/byUser/{userId}")
    public ResponseEntity<Set<BMIRecord>> getBmiByUserId(@PathVariable String userId) {
        log.info("Getting bmi calculations for userId: {}", userId);
        Set<BMIRecord> bmiRecords = bmiRecordService.getBmiByUserId(userId);
        log.info("Returning {} BMI records.", bmiRecords.size());
        return ResponseEntity.ok().body(bmiRecords);
    }

    @GetMapping("/get/byNoteId/{id}")
    public ResponseEntity<BMIRecord> getBMIRecord(@PathVariable Long id) {
        log.info("Received request to get BMI record with id: {}", id);
        Optional<BMIRecord> bmiRecord = bmiRecordService.getBMIRecord(id);
        if (bmiRecord.isPresent()) {
            log.info("BMI record found with id: {}. Returning the record.", id);
            return ResponseEntity.ok().body(bmiRecord.get());
        } else {
            log.info("No BMI record found with id: {}. Returning not found response.", id);
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/post")
    public ResponseEntity<BMIRecord> createBMIRecord(@RequestBody BMIRecord bmiRecord) {
        log.info("Received request to set BMI record: {}", bmiRecord);
        BMIRecord savedRecord = bmiRecordService.createBMIRecord(bmiRecord);
        log.info("BMI record saved successfully: {}", savedRecord);
        return ResponseEntity.ok().body(savedRecord);
    }

    @PostMapping("/partial")
    public ResponseEntity<BMIRecord> createPartialBMIRecord(@RequestParam double weight,
                                                            @RequestParam double height,
                                                            @RequestParam String userId) {
        log.info("Received request to create partial BMI record with weight: {}, height: {}, and userId: {}", weight, height, userId);
        try {
            BMIRecord bmiRecord = bmiRecordService.createPartialBMIRecord(weight, height, userId);
            return new ResponseEntity<>(bmiRecord, HttpStatus.CREATED);
        } catch (ResponseStatusException ex) {
            log.error("Failed to create partial BMI record: {}", ex.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBMIRecord(@PathVariable Long id) {
        log.info("Received request to delete BMI record with id: {}", id);
        bmiRecordService.deleteBMIRecord(id);
        log.info("BMI record with id: {} deleted successfully.", id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/put/object/{id}")
    public ResponseEntity<BMIRecord> updateBMIRecord(@PathVariable Long id, @RequestBody BMIRecord updatedBMIRecord) {
        try {
            log.info("Updating BMI record with id: {}", id);
            bmiRecordService.updateBMIRecord(id, updatedBMIRecord);
            return ResponseEntity.ok(updatedBMIRecord);
        } catch (ResponseStatusException e) {
            log.warn("BMI record with id: {} not found", id);
            return ResponseEntity.status(e.getStatusCode()).body(null);
        }
    }

    @PutMapping("/put/{id}")
    public ResponseEntity<BMIRecord> updateHeightWeightCategory(@PathVariable Long id, @RequestBody BMIRecord updatedBMIRecord) {
        log.info("Updating BMI record with ID: {}", id);
        Optional<BMIRecord> updatedRecordOptional = bmiRecordService.updatePartialBMIRecord(id, updatedBMIRecord);
        if (updatedRecordOptional.isPresent()) {
            log.info("BMI record with ID {} successfully updated", id);
            return ResponseEntity.ok(updatedRecordOptional.get());
        } else {
            log.warn("BMI record with ID {} not found", id);
            return ResponseEntity.notFound().build();
        }
    }

}
