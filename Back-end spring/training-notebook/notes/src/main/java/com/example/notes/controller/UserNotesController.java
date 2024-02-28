package com.example.notes.controller;

import com.example.notes.entitie.UserNotes;
import com.example.notes.service.UserNotesService;
import jakarta.annotation.security.RolesAllowed;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/notes")

public class UserNotesController {

    private final UserNotesService userNotesService;

    @GetMapping
    public ResponseEntity<Stream<UserNotes>> getAllNotes() {
        log.info("Getting all notes");
        return ResponseEntity.ok().body(userNotesService.getNotes().stream());
    }

    @GetMapping("/byUserId")
    public ResponseEntity<Stream<UserNotes>> getNotesByUserId(Principal principal) {
        String userId = principal.getName();
        log.info("Getting notes for userId: {}", userId);
        return ResponseEntity.ok().body(userNotesService.getNotesByUserId(userId).stream());
    }

    @GetMapping("/byUserIdAndStartDate")
    public List<UserNotes> getNotesByUserIdAndStartDate(Principal principal, @RequestParam String startDate) {
        log.info("Getting notes for userId: {} and startDate: {}", principal, startDate);
        return userNotesService.findByUserIdAndStartDateLike(principal.getName(), startDate);
    }

    @GetMapping("/{noteId}")
    public ResponseEntity<UserNotes> getNoteByNoteId(@PathVariable Long noteId) {
        log.info("Getting note by noteId: {}", noteId);
        Optional<UserNotes> noteOptional = userNotesService.getNote(noteId);
        noteOptional.ifPresent(note -> log.info("Note found: {}", note));
        return noteOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public void createNote(@RequestBody UserNotes userNotes, Principal principal) {
        String userId = principal.getName();
        log.info("Creating a new note for userId: {}", userId);
        userNotes.setUserId(userId);
        userNotesService.createNote(userNotes);
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<Void> deleteNoteById(@PathVariable Long noteId) {
        try {
            log.info("Deleting note by noteId: {}", noteId);
            userNotesService.deleteNote(noteId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            log.warn("Note with noteId: {} not found", noteId);
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{noteId}")
    public ResponseEntity<UserNotes> updateNote(@PathVariable Long noteId, @RequestBody UserNotes updatedNote) {
        try {
            log.info("Updating note with noteId: {}", noteId);
            UserNotes updatedNoteResult = userNotesService.updateNote(noteId, updatedNote);
            return ResponseEntity.ok(updatedNoteResult);
        } catch (ResponseStatusException e) {
            log.warn("Note with noteId: {} not found", noteId);
            return ResponseEntity.status(e.getStatusCode()).body(null);
        }
    }
}