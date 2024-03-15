package com.example.body.body.service;

import com.example.body.body.controller.BodyProfileDTO;
import com.example.body.body.entitie.BodyProfile;
import com.example.body.body.entitie.Photo;
import com.example.body.body.repository.BodyProfileRepo;
import com.example.body.body.repository.PhotoRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiConsumer;

@Service
@AllArgsConstructor
public class BodyProfileServiceImlp implements BodyProfileeService {

    private final BodyProfileRepo bodyProfileRepo;
    private final PhotoRepo photoRepo;

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
        BodyProfile bodyProfile = Optional.ofNullable(bodyProfileRepo.findByIdUser(id))
                .orElseThrow(() -> new RuntimeException("BodyProfile with id " + id + " does not exist."));

        Map<String, BiConsumer<BodyProfile, BodyProfileDTO>> attributeUpdaters = new HashMap<>();
        attributeUpdaters.put("weight", (bp, bpDTO) -> bp.setWeight(bpDTO.getWeight()));
        attributeUpdaters.put("height", (bp, bpDTO) -> bp.setHeight(bpDTO.getHeight()));
        attributeUpdaters.put("gender", (bp, bpDTO) -> bp.setGender(bpDTO.getGender()));
        attributeUpdaters.put("age", (bp, bpDTO) -> bp.setAge(bpDTO.getAge()));
        attributeUpdaters.put("goals", (bp, bpDTO) -> bp.setGoals(bpDTO.getGoals()));

        if (attributeUpdaters.containsKey(attribute)) {
            attributeUpdaters.get(attribute).accept(bodyProfile, bodyProfileDTO);
        }

        return bodyProfileRepo.save(bodyProfile);
    }

    @Override
    public Optional<Photo> findUserPhoto(String id) {
        return Optional.ofNullable(photoRepo.findByIdUser(id));
    }

    @Override
    public Photo createPhotoProfile(Photo photoProfile) {
        return photoRepo.save(photoProfile);
    }

    @Override
    public Photo updatePhoto(Photo photo) {
        return photoRepo.save(photo);
    }

}
