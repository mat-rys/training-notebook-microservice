package com.example.calculator.bmi.repository;

import com.example.calculator.bmi.entitie.BMIRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BMIRecordRepo extends JpaRepository<BMIRecord,Long>{
    List<BMIRecord> findByUserId(String userId);
}
