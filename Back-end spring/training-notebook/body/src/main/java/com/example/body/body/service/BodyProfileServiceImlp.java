package com.example.body.body.service;

import com.example.body.body.entitie.BodyProfile;
import com.example.body.body.repository.BodyProfileRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class BodyProfileServiceImlp implements BodyProfileeService {

    private final BodyProfileRepo bodyProfileRepo;

    @Override
    public Optional<BodyProfile> getBodyProfileById(String id) {
        return Optional.ofNullable(bodyProfileRepo.findByIdUser(id));
    }

    @Override
    public BodyProfile createBodyProfile(BodyProfile bodyProfile) {
        return bodyProfileRepo.save(bodyProfile);
    }

    @Override
    public BodyProfile updateBodyProfile(String id, BodyProfile updatedBodyProfile) {
        updatedBodyProfile.setIdUser(id);
        return bodyProfileRepo.save(updatedBodyProfile);
    }

    @Override
    public BodyProfile updateWeight(String id, Double weight) {
        Optional<BodyProfile> optionalBodyProfile = Optional.ofNullable(bodyProfileRepo.findByIdUser(id));
        if (optionalBodyProfile.isPresent()) {
            BodyProfile bodyProfile = optionalBodyProfile.get();
            bodyProfile.setWeight(weight);
            return bodyProfileRepo.save(bodyProfile);
        } else {
            // Jeśli nie istnieje rekord, utwórz nowy i zapisz
            BodyProfile newBodyProfile = BodyProfile.builder()
                    .idUser(id)
                    .weight(weight)
                    .build();
            return bodyProfileRepo.save(newBodyProfile);
        }
    }

    @Override
    public BodyProfile updateHeight(String id, Double height) {
        Optional<BodyProfile> optionalBodyProfile = Optional.ofNullable(bodyProfileRepo.findByIdUser(id));
        if (optionalBodyProfile.isPresent()) {
            BodyProfile bodyProfile = optionalBodyProfile.get();
            bodyProfile.setHeight(height);
            return bodyProfileRepo.save(bodyProfile);
        } else {
            // Jeśli nie istnieje rekord, utwórz nowy i zapisz
            BodyProfile newBodyProfile = BodyProfile.builder()
                    .idUser(id)
                    .height(height)
                    .build();
            return bodyProfileRepo.save(newBodyProfile);
        }
    }

    @Override
    public BodyProfile updateGender(String id, String gender) {
        Optional<BodyProfile> optionalBodyProfile = Optional.ofNullable(bodyProfileRepo.findByIdUser(id));
        if (optionalBodyProfile.isPresent()) {
            BodyProfile bodyProfile = optionalBodyProfile.get();
            bodyProfile.setGender(gender);
            return bodyProfileRepo.save(bodyProfile);
        } else {
            // Jeśli nie istnieje rekord, utwórz nowy i zapisz
            BodyProfile newBodyProfile = BodyProfile.builder()
                    .idUser(id)
                    .gender(gender)
                    .build();
            return bodyProfileRepo.save(newBodyProfile);
        }
    }

    @Override
    public BodyProfile updateAge(String id, Integer age) {
        Optional<BodyProfile> optionalBodyProfile = Optional.ofNullable(bodyProfileRepo.findByIdUser(id));
        if (optionalBodyProfile.isPresent()) {
            BodyProfile bodyProfile = optionalBodyProfile.get();
            bodyProfile.setAge(age);
            return bodyProfileRepo.save(bodyProfile);
        } else {
            // Jeśli nie istnieje rekord, utwórz nowy i zapisz
            BodyProfile newBodyProfile = BodyProfile.builder()
                    .idUser(id)
                    .age(age)
                    .build();
            return bodyProfileRepo.save(newBodyProfile);
        }
    }

    @Override
    public BodyProfile updateGoals(String id, String goals) {
        Optional<BodyProfile> optionalBodyProfile = Optional.ofNullable(bodyProfileRepo.findByIdUser(id));
        if (optionalBodyProfile.isPresent()) {
            BodyProfile bodyProfile = optionalBodyProfile.get();
            bodyProfile.setGoals(goals);
            return bodyProfileRepo.save(bodyProfile);
        } else {
            // Jeśli nie istnieje rekord, utwórz nowy i zapisz
            BodyProfile newBodyProfile = BodyProfile.builder()
                    .idUser(id)
                    .goals(goals)
                    .build();
            return bodyProfileRepo.save(newBodyProfile);
        }
    }
}
