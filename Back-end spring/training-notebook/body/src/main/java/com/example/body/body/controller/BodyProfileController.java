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

    @GetMapping("/photo")
    public ResponseEntity<Photo> getPhoto(Principal principal) {
        Photo photo = photoRepo.findByIdUser(principal.getName());
        return (photo != null) ? ResponseEntity.ok(photo) : ResponseEntity.notFound().build();
    }

    @GetMapping("/get")
    public ResponseEntity<BodyProfile> getBodyProfile(Principal principal) {
        Optional<BodyProfile> bodyProfile = bodyProfileService.getBodyProfileById(principal.getName());
        return bodyProfile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/photo")
    public ResponseEntity<String> createPhoto(@RequestBody Photo photo, Principal principal) {
        photo.setIdUser(principal.getName());
        photoRepo.save(photo);
        return ResponseEntity.status(HttpStatus.CREATED).body("Zapisano nowy obrazek profilowy.");
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
