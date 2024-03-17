package com.example.body.body.service;

import com.example.body.body.controller.BodyProfileDTO;
import com.example.body.body.controller.LimitsProfileDTO;
import com.example.body.body.entitie.BodyProfile;
import com.example.body.body.entitie.LimitsProfile;
import com.example.body.body.entitie.Photo;
import com.example.body.body.repository.BodyProfileRepo;
import com.example.body.body.repository.LimitsProfileRepo;
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
    private final LimitsProfileRepo limitsProfileRepo;
    //PHOTO
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

    //BODY
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
    public BodyProfile updateBodyAttribute(String id, String attribute, BodyProfileDTO bodyProfileDTO) {
        BodyProfile bodyProfile = Optional.ofNullable(bodyProfileRepo.findByIdUser(id))
                .orElseThrow(() -> new RuntimeException("BodyProfile with id " + id + " does not exist."));

        Map<String, BiConsumer<BodyProfile, BodyProfileDTO>> attributeUpdaters = new HashMap<>();
        attributeUpdaters.put("weight", (bp, bpDTO) -> bp.setWeight(bpDTO.getWeight()));
        attributeUpdaters.put("height", (bp, bpDTO) -> bp.setHeight(bpDTO.getHeight()));
        attributeUpdaters.put("gender", (bp, bpDTO) -> bp.setGender(bpDTO.getGender()));
        attributeUpdaters.put("age", (bp, bpDTO) -> bp.setAge(bpDTO.getAge()));
        attributeUpdaters.put("goals", (bp, bpDTO) -> bp.setGoals(bpDTO.getGoals()));

        if (attributeUpdaters.containsKey(attribute)) {attributeUpdaters.get(attribute).accept(bodyProfile, bodyProfileDTO);}
        return bodyProfileRepo.save(bodyProfile);
    }

    //LIMITS
    @Override
    public Optional<LimitsProfile> findUserLimits(String id) {
        return limitsProfileRepo.findById(id);
    }

    @Override
    public LimitsProfile createLimitsProfile(LimitsProfile limitsProfile) {
        return limitsProfileRepo.save(limitsProfile);
    }

    @Override
    public LimitsProfile updateLimitsAttribute(String id, String attribute,  LimitsProfileDTO limitsProfileDTO) {
        Optional<LimitsProfile> limitsProfile = Optional.of(limitsProfileRepo.findById(id))
                .orElseThrow(() -> new RuntimeException("LimitsProfile with id " + id + " does not exist."));

        Map<String, BiConsumer<LimitsProfile, LimitsProfileDTO>> attributeUpdaters = new HashMap<>();
        attributeUpdaters.put("limitCalories", (lp, lpDTO) -> lp.setLimitCalories(lpDTO.getLimitCalories()));
        attributeUpdaters.put("limitCarbs", (lp, lpDTO) -> lp.setLimitCarbs(lpDTO.getLimitCarbs()));
        attributeUpdaters.put("limitFats", (lp, lpDTO) -> lp.setLimitFats(lpDTO.getLimitFats()));
        attributeUpdaters.put("limitProteins", (lp, lpDTO) -> lp.setLimitProteins(lpDTO.getLimitProteins()));

        if (attributeUpdaters.containsKey(attribute)) {
            attributeUpdaters.get(attribute).accept(limitsProfile.get(), limitsProfileDTO);
        }
        return limitsProfileRepo.save(limitsProfile.get());
    }

}
