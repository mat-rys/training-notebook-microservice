package com.example.calculator.bmi.service;

import com.example.calculator.bmi.entitie.BMIRecord;
import com.example.calculator.bmi.repository.BMIRecordRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BMIRecordServiceImlp implements BMIRecordService {

    private final BMIRecordRepo bmiRecordRepo;


    @Override
    public Optional<BMIRecord> getBMIRecord(Long id) {
        return bmiRecordRepo.findById(id);
    }

    @Override
    public List<BMIRecord> getBMIRecords() {
        return bmiRecordRepo.findAll();
    }

    @Override
    public Set<BMIRecord> getBmiByUserId(String userId) {
        return new HashSet<>(bmiRecordRepo.findByUserId(userId));
    }

    @Override
    public BMIRecord createBMIRecord(BMIRecord bmiRecord) {
        return bmiRecordRepo.save(bmiRecord);
    }

    @Override
    public BMIRecord createPartialBMIRecord(double weight, double height, String userId) {
        Function<Double, Double> identityFunction = Function.identity();
        BMIRecord bmiRecord = BMIRecord.builder()
                .height(identityFunction.apply(height))
                .weight(identityFunction.apply(weight))
                .bmiValue(0.0)
                .bmiCategory("")
                .userId(userId)
                .build();
        return bmiRecordRepo.save(bmiRecord);
    }
    @Override
    public void deleteBMIRecord(Long id) {
        bmiRecordRepo.deleteById(id);
    }

    @Override
    public Optional<BMIRecord> updateBMIRecord(Long id, BMIRecord updatedBMIRecord) {
        Optional<BMIRecord> bmiRecordOptional = bmiRecordRepo.findById(id);
        bmiRecordOptional.ifPresent(existingBMIRecord -> {
            existingBMIRecord.setHeight(updatedBMIRecord.getHeight());
            existingBMIRecord.setWeight(updatedBMIRecord.getWeight());
            existingBMIRecord.setBmiValue(updatedBMIRecord.getBmiValue());
            existingBMIRecord.setBmiCategory(updatedBMIRecord.getBmiCategory());
            existingBMIRecord.setUserId(updatedBMIRecord.getUserId());
            bmiRecordRepo.save(existingBMIRecord);
        });
        return bmiRecordOptional;
    }

    @Override
    public Optional<BMIRecord> updatePartialBMIRecord(Long id, BMIRecord updatedBMIRecord) {
        return bmiRecordRepo.findById(id).map(existingBMIRecord -> {
            existingBMIRecord.setHeight(updatedBMIRecord.getHeight() != 0 ? updatedBMIRecord.getHeight() : existingBMIRecord.getHeight());
            existingBMIRecord.setWeight(updatedBMIRecord.getWeight() != 0 ? updatedBMIRecord.getWeight() : existingBMIRecord.getWeight());
            existingBMIRecord.setBmiCategory(updatedBMIRecord.getBmiCategory() != null && !updatedBMIRecord.getBmiCategory().isEmpty() ? updatedBMIRecord.getBmiCategory() : existingBMIRecord.getBmiCategory());
            return bmiRecordRepo.save(existingBMIRecord);
        });
    }

}

