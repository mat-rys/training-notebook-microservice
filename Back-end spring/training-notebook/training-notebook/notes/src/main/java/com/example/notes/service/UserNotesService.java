package com.example.notes.service;

import com.example.notes.entitie.UserNotes;

import java.util.Optional;
import java.util.Set;


public interface UserNotesService {

    Optional<UserNotes> getNote(Long noteId);
    UserNotes createNote(UserNotes userNotes);
    void deleteNote(Long noteId);
    Set<UserNotes> getNotes();
    Set<UserNotes> getNotesByUserId(String userId);
    UserNotes updateNote(Long noteId, UserNotes updatedNote);
}
