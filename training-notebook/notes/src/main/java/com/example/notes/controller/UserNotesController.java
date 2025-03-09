package com.example.notes.controller;

import com.example.notes.dto.ActivityCountDTO;
import com.example.notes.dto.ActivityTypeCountDTO;
import com.example.notes.dto.DailyNoteCountDTO;
import com.example.notes.dto.UserNoteDTO;
import com.example.notes.entitie.UserNotes;
import com.example.notes.service.UserNotesServiceImlp;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/notes")

public class UserNotesController {

    private final UserNotesServiceImlp userNotesServiceImlp;
    @GetMapping("/datepicker-dates")
    public List<String> getNotesForMonth(Principal principal) {
        return userNotesServiceImlp.findByUserIdAndYearMonth(principal.getName());
    }

    @GetMapping
    public ResponseEntity<Stream<UserNotes>> getAllNotes() {
        log.info("Getting all notes");
        return ResponseEntity.ok().body(userNotesServiceImlp.getNotes().stream());
    }

    @GetMapping("/byUserId")
    public ResponseEntity<Stream<UserNotes>> getNotesByUserId(Principal principal) {
        String userId = principal.getName();
        log.info("Getting notes for userId: {}", userId);
        return ResponseEntity.ok().body(userNotesServiceImlp.getNotesByUserId(userId).stream());
    }

    @GetMapping("/byUserIdAndStartDate")
    public ResponseEntity<List<UserNotes>> getNotesByUserIdAndStartDate(Principal principal, @RequestParam String startDate) {
        log.info("Getting notes for userId: {} and startDate: {}", principal.getName(), startDate);

        // Pobieranie notatek na podstawie userId i startDate
        List<UserNotes> notes = userNotesServiceImlp.findByUserIdAndStartDateLike(principal.getName(), startDate);

        // Sprawdzenie, czy lista notatek jest pusta. Jeśli tak, zwracamy 404 Not Found
        if (notes.isEmpty()) {
            log.warn("No notes found for userId: {} and startDate: {}", principal.getName(), startDate);
            return ResponseEntity.notFound().build(); // Zwrócenie 404, gdy brak wyników
        }

        // Zwracamy notatki w odpowiedzi z kodem 200 OK
        return ResponseEntity.ok(notes);
    }


    @GetMapping("/{noteId}")
    public ResponseEntity<UserNotes> getNoteByNoteId(@PathVariable Long noteId) {
        log.info("Getting note by noteId: {}", noteId);
        Optional<UserNotes> noteOptional = userNotesServiceImlp.getNote(noteId);
        noteOptional.ifPresent(note -> log.info("Note found: {}", note));
        return noteOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserNotes> createNote(@RequestBody UserNotes userNotes, Principal principal) {
        String userId = principal.getName();
        log.info("Creating a new note for userId: {}", userId);
        userNotes.setUserId(userId);
        UserNotes createdNote = userNotesServiceImlp.createNote(userNotes);
        return ResponseEntity.ok(createdNote);
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<Void> deleteNoteById(@PathVariable Long noteId) {
        try {
            log.info("Deleting note by noteId: {}", noteId);
            userNotesServiceImlp.deleteNote(noteId);
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
            UserNotes updatedNoteResult = userNotesServiceImlp.updateNote(noteId, updatedNote);
            return ResponseEntity.ok(updatedNoteResult);
        } catch (ResponseStatusException e) {
            log.warn("Note with noteId: {} not found", noteId);
            return ResponseEntity.status(e.getStatusCode()).body(null);
        }
    }

    @GetMapping("/statistics/activity-count")
    public ResponseEntity<List<ActivityTypeCountDTO>> getActivityCountByDateRange(
            @RequestParam("fromDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fromDate,
            @RequestParam("toDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date toDate,
            Principal principal) {
        List<ActivityTypeCountDTO> activityCounts = userNotesServiceImlp.getActivityCountsByUserIdAndDateRange(principal.getName(), fromDate, toDate);
        return ResponseEntity.ok(activityCounts);
    }

    @GetMapping("/statistics/activity-count-by-weekday")
    public ResponseEntity<List<ActivityCountDTO>> getActivityCountsByWeekday(
            Principal principal,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fromDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date toDate) {
        List<ActivityCountDTO> activityCounts = userNotesServiceImlp.getActivityCountsByWeekday(principal.getName(), fromDate, toDate);
        return ResponseEntity.ok(activityCounts);
    }

    @GetMapping("/statistics/daily-counts")
    public ResponseEntity<List<DailyNoteCountDTO>> getDailyNoteCounts(
            Principal principal,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fromDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date toDate) {
        List<DailyNoteCountDTO> dailyCounts = userNotesServiceImlp.getDailyNoteCounts(principal.getName(), fromDate, toDate);
        return ResponseEntity.ok(dailyCounts);
    }
}