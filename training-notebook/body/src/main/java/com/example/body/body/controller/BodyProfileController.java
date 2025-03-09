package com.example.body.body.controller;

import com.example.body.body.dto.BodyProfileDTO;
import com.example.body.body.dto.LimitsProfileDTO;
import com.example.body.body.entitie.BodyProfile;
import com.example.body.body.entitie.LimitsProfile;
import com.example.body.body.entitie.Photo;
import com.example.body.body.service.BodyProfileServiceImlp;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("/body")
@AllArgsConstructor
public class BodyProfileController {

    private final BodyProfileServiceImlp bodyProfileServiceImpl;

    //PHOTO
    @GetMapping("/photo")
    public ResponseEntity<Optional<Photo>> getPhoto(Principal principal) {
        Optional<Photo> photo =  bodyProfileServiceImpl.findUserPhoto(principal.getName());
        return (photo.isPresent()) ? ResponseEntity.ok(photo) : ResponseEntity.notFound().build();
    }

    @PostMapping("/photo/post")
    public ResponseEntity<Photo> createPhoto(@RequestBody Photo photo, Principal principal) {
        photo.setIdUser(principal.getName());
        Photo photoProfile = bodyProfileServiceImpl.createPhotoProfile(photo);
        return new ResponseEntity<>(photoProfile, HttpStatus.CREATED);
    }

    @PutMapping("/photo/put")
    public ResponseEntity<Photo> updatePhoto(@RequestBody Photo photo, Principal principal) {
        photo.setIdUser(principal.getName());
        Optional<Photo> photoProfile = Optional.ofNullable(bodyProfileServiceImpl.updatePhoto(photo));
        return ResponseEntity.ok(photoProfile.get());
    }

    //BODY
    @GetMapping("/get")
    public ResponseEntity<BodyProfile> getBodyProfile(Principal principal) {
        Optional<BodyProfile> bodyProfile = bodyProfileServiceImpl.getBodyProfileById(principal.getName());
        return bodyProfile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/post")
    public ResponseEntity<BodyProfile> createBodyProfile(@RequestBody BodyProfile bodyProfile, Principal principal) {
        bodyProfile.setIdUser(principal.getName());
        BodyProfile createdProfile = bodyProfileServiceImpl.createBodyProfile(bodyProfile);
        return new ResponseEntity<>(createdProfile, HttpStatus.CREATED);
    }

    @PutMapping("/body/{attribute}")
    public ResponseEntity<BodyProfile> updateBodyAttribute(Principal principal, @PathVariable String attribute, @RequestBody BodyProfileDTO bodyProfileDTO) {
        BodyProfile updatedProfile = bodyProfileServiceImpl.updateBodyAttribute(principal.getName(), attribute, bodyProfileDTO);
        return ResponseEntity.ok(updatedProfile);
    }

    //LIMITS
    @GetMapping("/limits")
    public ResponseEntity<Optional<LimitsProfile>> getLimits(Principal principal) {
        Optional<LimitsProfile> limitsProfile = bodyProfileServiceImpl.findUserLimits(principal.getName());
        return (limitsProfile.isPresent()) ? ResponseEntity.ok(limitsProfile) : ResponseEntity.notFound().build();
    }

    @PostMapping("/limits/post")
    public ResponseEntity<LimitsProfile> createLimitsProfile(@RequestBody LimitsProfile limitsProfile, Principal principal) {
        limitsProfile.setIdUser(principal.getName());
        LimitsProfile newLimitsProfile = bodyProfileServiceImpl.createLimitsProfile(limitsProfile);
        return new ResponseEntity<>(newLimitsProfile, HttpStatus.CREATED);
    }

    @PutMapping("/limits/{attribute}")
    public ResponseEntity<LimitsProfile> updateAttribute(Principal principal, @PathVariable String attribute, @RequestBody LimitsProfileDTO limitsProfileDTO) {
        LimitsProfile updatedProfile = bodyProfileServiceImpl.updateLimitsAttribute(principal.getName(), attribute, limitsProfileDTO);
        return ResponseEntity.ok(updatedProfile);
    }


}
