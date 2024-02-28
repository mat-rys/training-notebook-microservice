package com.example.body.body.service;

import com.example.body.body.controller.BodyProfileDTO;
import com.example.body.body.entitie.BodyProfile;

import java.util.Optional;

public interface BodyProfileeService {

    Optional<BodyProfile> getBodyProfileById(String id);

    BodyProfile createBodyProfile(BodyProfile bodyProfile);

    BodyProfile updateBodyProfile(String id, BodyProfile updatedBodyProfile);

    public BodyProfile updateAttribute(String id, String attribute, BodyProfileDTO bodyProfileDTO);

}
