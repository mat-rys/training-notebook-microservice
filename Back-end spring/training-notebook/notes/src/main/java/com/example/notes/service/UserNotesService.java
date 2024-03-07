package com.example.notes.service;

import com.example.notes.entitie.UserNotes;

import java.util.List;
import java.util.Optional;
import java.util.Set;


public interface UserNotesService {


    List<UserNotes> findByUserIdAndStartDateLike(String userId, String startDate);
    Optional<UserNotes> getNote(Long noteId);
    UserNotes createNote(UserNotes userNotes);
    void deleteNote(Long noteId);
    Set<UserNotes> getNotes();
    Set<UserNotes> getNotesByUserId(String userId);
    UserNotes updateNote(Long noteId, UserNotes updatedNote);
    List<Integer> findByUserIdAndYearMonth(String userId, String yearMonth);

}
