package com.example.body.body.service;

import com.example.body.body.controller.BodyProfileDTO;
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
    public BodyProfile updateAttribute(String id, String attribute, BodyProfileDTO bodyProfileDTO) {
        Optional<BodyProfile> optionalBodyProfile = Optional.ofNullable(bodyProfileRepo.findByIdUser(id));
        if (optionalBodyProfile.isPresent()) {
            BodyProfile bodyProfile = optionalBodyProfile.get();
            switch (attribute) {
                case "weight":
                    bodyProfile.setWeight(bodyProfileDTO.getWeight());
                    break;
                case "height":
                    bodyProfile.setHeight(bodyProfileDTO.getHeight());
                    break;
                case "gender":
                    bodyProfile.setGender(bodyProfileDTO.getGender());
                    break;
                case "age":
                    bodyProfile.setAge(bodyProfileDTO.getAge());
                    break;
                case "goals":
                    bodyProfile.setGoals(bodyProfileDTO.getGoals());
                    break;
            }
            return bodyProfileRepo.save(bodyProfile);
        } else {
            throw new RuntimeException("BodyProfile with id " + id + " does not exist.");
        }
    }
}
