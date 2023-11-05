package com.example.body.body.service;

import com.example.body.body.entitie.BodyProfile;

import java.util.Optional;

public interface BodyProfileeService {

    Optional<BodyProfile> getBodyProfileById(String id);

    BodyProfile createBodyProfile(BodyProfile bodyProfile);

    BodyProfile updateBodyProfile(String id, BodyProfile updatedBodyProfile);


    BodyProfile updateWeight(String id, Double weight);

    BodyProfile updateHeight(String id, Double height);

    BodyProfile updateGender(String id, String gender);

    BodyProfile updateAge(String id, Integer age);

    BodyProfile updateGoals(String id, String goals);

}
