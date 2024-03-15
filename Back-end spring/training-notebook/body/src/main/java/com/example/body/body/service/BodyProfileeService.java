package com.example.body.body.service;

import com.example.body.body.controller.BodyProfileDTO;
import com.example.body.body.entitie.BodyProfile;
import com.example.body.body.entitie.Photo;

import java.util.Optional;

public interface BodyProfileeService {
    Optional<BodyProfile> getBodyProfileById(String id);
    BodyProfile createBodyProfile(BodyProfile bodyProfile);
    BodyProfile updateBodyProfile(String id, BodyProfile updatedBodyProfile);
    BodyProfile updateAttribute(String id, String attribute, BodyProfileDTO bodyProfileDTO);
    Optional<Photo> findUserPhoto(String id);
    Photo createPhotoProfile(Photo photoProfile);
    Photo updatePhoto(Photo photo) ;
}
