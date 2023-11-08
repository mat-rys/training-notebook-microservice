package com.example.body.body.controller;

import com.example.body.body.entitie.BodyProfile;
import com.example.body.body.entitie.Photo;
import com.example.body.body.repository.PhotoRepo;
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
    private PhotoRepo photoRepo;

    // Obsługuje żądanie POST do zapisania nowego obrazka profilowego
    @PostMapping("/photo")
    public ResponseEntity<String> createPhoto(@RequestBody Photo photo, Principal principal) {
        photo.setIdUser(principal.getName());
        photoRepo.save(photo);
        log.info("Zapisano nowy obrazek profilowy.");
        return ResponseEntity.status(HttpStatus.CREATED).body("Zapisano nowy obrazek profilowy.");
    }

    // Obsługuje żądanie GET do pobrania obrazka profilowego na podstawie id użytkownika
    @GetMapping("/photo")
    public ResponseEntity<Photo> getPhoto(Principal principal) {
        Photo photo = photoRepo.findByIdUser(principal.getName());
        if (photo != null) {
            return ResponseEntity.ok(photo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/get")
    public ResponseEntity<BodyProfile> getBodyProfile(Principal principal) {
        Optional<BodyProfile> bodyProfile = bodyProfileService.getBodyProfileById(principal.getName());
        if (bodyProfile.isPresent()) {
            return ResponseEntity.ok(bodyProfile.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/post")
    public ResponseEntity<BodyProfile> createBodyProfile(@RequestBody BodyProfile bodyProfile, Principal principal) {
        bodyProfile.setIdUser(principal.getName());
        BodyProfile createdProfile = bodyProfileService.createBodyProfile(bodyProfile);
        return new ResponseEntity<>(createdProfile, HttpStatus.CREATED);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<BodyProfile> updateBodyProfile(Principal principal, @RequestBody BodyProfile updatedBodyProfile) {
//        BodyProfile updatedProfile = bodyProfileService.updateBodyProfile(principal.getName(), updatedBodyProfile);
//        if (updatedProfile != null) {
//            return ResponseEntity.ok(updatedProfile);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PutMapping("/weight")
    public ResponseEntity<BodyProfile> updateWeight(Principal principal, @RequestBody Double weight) {

        log.info("Received weight: " + weight);

        BodyProfile updatedProfile = bodyProfileService.updateWeight(principal.getName(), weight);
        if (updatedProfile != null) {
            return ResponseEntity.ok(updatedProfile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/height")
    public ResponseEntity<BodyProfile> updateHeight(Principal principal, @RequestBody Double height) {
        BodyProfile updatedProfile = bodyProfileService.updateHeight(principal.getName(), height);
        if (updatedProfile != null) {
            return ResponseEntity.ok(updatedProfile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/gender")
    public ResponseEntity<BodyProfile> updateGender(Principal principal, @RequestBody String gender) {
        BodyProfile updatedProfile = bodyProfileService.updateGender(principal.getName(), gender);
        if (updatedProfile != null) {
            return ResponseEntity.ok(updatedProfile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/age")
    public ResponseEntity<BodyProfile> updateAge(Principal principal, @RequestBody Integer age) {
        BodyProfile updatedProfile = bodyProfileService.updateAge(principal.getName(), age);
        if (updatedProfile != null) {
            return ResponseEntity.ok(updatedProfile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/goals")
    public ResponseEntity<BodyProfile> updateGoals(Principal principal, @RequestBody String goals) {
        BodyProfile updatedProfile = bodyProfileService.updateGoals(principal.getName(), goals);
        if (updatedProfile != null) {
            return ResponseEntity.ok(updatedProfile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
