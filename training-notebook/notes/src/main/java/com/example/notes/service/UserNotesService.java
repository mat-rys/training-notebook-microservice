package com.example.notes.service;

import com.example.notes.dto.ActivityCountDTO;
import com.example.notes.dto.ActivityTypeCountDTO;
import com.example.notes.dto.DailyNoteCountDTO;
import com.example.notes.entitie.UserNotes;

import java.sql.Timestamp;
import java.util.*;


public interface UserNotesService {

    List<UserNotes> findByUserIdAndStartDateLike(String userId, String startDate);
    Optional<UserNotes> getNote(Long noteId);
    UserNotes createNote(UserNotes userNotes);
    void deleteNote(Long noteId);
    Set<UserNotes> getNotes();
    Set<UserNotes> getNotesByUserId(String userId);
    UserNotes updateNote(Long noteId, UserNotes updatedNote);
    List<String> findByUserIdAndYearMonth(String userId);
    List<ActivityTypeCountDTO> getActivityCountsByUserIdAndDateRange(String userId, Date fromDate, Date toDate);

    List<ActivityCountDTO> getActivityCountsByWeekday(String userId, Date fromDate, Date toDate);

    List<DailyNoteCountDTO> getDailyNoteCounts(String userId, Date fromDate, Date toDate);

}
