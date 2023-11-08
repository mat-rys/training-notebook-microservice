package com.example.notes.service;

import com.example.notes.entitie.UserNotes;
import com.example.notes.repository.UserNotesRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserNotesServiceImlp implements UserNotesService {

    private final UserNotesRepo userNotesRepo;

    @Override
    public Optional<UserNotes> getNote(Long noteId) {
        return userNotesRepo.findById(noteId);
    }

    @Override
    public UserNotes createNote(UserNotes userNotes) {
        return userNotesRepo.save(userNotes);
    }

    @Override
    public void deleteNote(Long noteId) {
        userNotesRepo.deleteById(noteId);
    }

    @Override
    public Set<UserNotes> getNotes() {
        return new HashSet<>(userNotesRepo.findAll());
    }

    @Override
    public Set<UserNotes> getNotesByUserId(String userId) {
        return new HashSet<>(userNotesRepo.findByUserId(userId));
    }

    @Override
    public UserNotes updateNote(Long noteId, UserNotes updatedNote) {
        Optional<UserNotes> noteOptional = userNotesRepo.findById(noteId);
        if (noteOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Note with id: " + noteId + " not found");
        }
        UserNotes existingNote = noteOptional.get();
        existingNote.setTitle(updatedNote.getTitle());
        existingNote.setActivityType(updatedNote.getActivityType());
        existingNote.setStartDate(updatedNote.getStartDate());
        existingNote.setEndDate(updatedNote.getEndDate());
        existingNote.setDescription(updatedNote.getDescription());
        return userNotesRepo.save(existingNote);
    }
}
