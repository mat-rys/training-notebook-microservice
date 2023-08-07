package com.example.calculator.bmi.service;

import com.example.calculator.bmi.entitie.BMIRecord;

import java.util.List;
import java.util.Optional;
import java.util.Set;


public interface BMIRecordService {

    Optional<BMIRecord> getBMIRecord(Long id);
    BMIRecord createBMIRecord(BMIRecord bmiRecord);
    BMIRecord createPartialBMIRecord(double weight, double height, String userId);
    void deleteBMIRecord(Long id);
    List<BMIRecord> getBMIRecords();
    Set<BMIRecord> getBmiByUserId(String userId);
    Optional<BMIRecord> updateBMIRecord(Long id, BMIRecord updatedBMIRecord);
    Optional<BMIRecord> updatePartialBMIRecord(Long id, BMIRecord updatedBMIRecord);
}
