package com.example.body.body.controller;

import com.example.body.body.entitie.BodyProfile;
import com.example.body.body.entitie.Photo;
import com.example.body.body.service.BodyProfileeService;

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

    private final BodyProfileeService bodyProfileService;

    @GetMapping("/photo")
    public ResponseEntity<Optional<Photo>> getPhoto(Principal principal) {
        Optional<Photo> photo =  bodyProfileService.findUserPhoto(principal.getName());
        return (photo.isPresent()) ? ResponseEntity.ok(photo) : ResponseEntity.notFound().build();
    }

    @GetMapping("/get")
    public ResponseEntity<BodyProfile> getBodyProfile(Principal principal) {
        Optional<BodyProfile> bodyProfile = bodyProfileService.getBodyProfileById(principal.getName());
        return bodyProfile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/photo/post")
    public ResponseEntity<Photo> createPhoto(@RequestBody Photo photo, Principal principal) {
        photo.setIdUser(principal.getName());
        Photo photoProfile = bodyProfileService.createPhotoProfile(photo);
        return new ResponseEntity<>(photoProfile, HttpStatus.CREATED);
    }

    @PutMapping("/photo/put")
    public ResponseEntity<Photo> updatePhoto(@RequestBody Photo photo, Principal principal) {
        photo.setIdUser(principal.getName());
        Optional<Photo> photoProfile = Optional.ofNullable(bodyProfileService.updatePhoto(photo));
        return ResponseEntity.ok(photoProfile.get());
    }

    @PostMapping("/post")
    public ResponseEntity<BodyProfile> createBodyProfile(@RequestBody BodyProfile bodyProfile, Principal principal) {
        bodyProfile.setIdUser(principal.getName());
        BodyProfile createdProfile = bodyProfileService.createBodyProfile(bodyProfile);
        return new ResponseEntity<>(createdProfile, HttpStatus.CREATED);
    }

    @PutMapping("/{attribute}")
    public ResponseEntity<BodyProfile> updateAttribute(Principal principal, @PathVariable String attribute, @RequestBody BodyProfileDTO bodyProfileDTO) {
        BodyProfile updatedProfile = bodyProfileService.updateAttribute(principal.getName(), attribute, bodyProfileDTO);
        return ResponseEntity.ok(updatedProfile);
    }
}
