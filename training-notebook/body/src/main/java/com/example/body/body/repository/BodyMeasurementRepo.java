package com.example.body.body.repository;

import com.example.body.body.entitie.BodyMeasurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BodyMeasurementRepo extends JpaRepository<BodyMeasurement, Long> {
    List<BodyMeasurement> findByBodyProfile_IdUser(String idUser);
}
