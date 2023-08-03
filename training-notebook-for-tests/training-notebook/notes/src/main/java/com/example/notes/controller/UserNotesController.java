package com.example.notes.controller;

import com.example.notes.entitie.UserNotes;
import com.example.notes.service.UserNotesService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
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

    @GetMapping("/get/byUser/{userId}")
    public ResponseEntity<Stream<UserNotes>> getNotesByUserId(@PathVariable String userId) {
        log.info("Getting notes for userId: {}", userId);
        return ResponseEntity.ok().body(userNotesService.getNotesByUserId(userId).stream());
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
    public void createNote(@RequestBody UserNotes userNotes) {
        log.info("Creating a new note ");
        userNotesService.createNote(userNotes);
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<Void> deleteNoteById(@PathVariable Long noteId) {
        log.info("Deleting note by noteId: {}", noteId);
        userNotesService.deleteNote(noteId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PutMapping("/{noteId}")
    public ResponseEntity<UserNotes> updateNote(@PathVariable Long noteId, @RequestBody UserNotes updatedNote) {
        log.info("Updating note with noteId: {}", noteId);
        UserNotes updatedNoteResult = userNotesService.updateNote(noteId, updatedNote);
        return ResponseEntity.ok(updatedNoteResult);
    }
}