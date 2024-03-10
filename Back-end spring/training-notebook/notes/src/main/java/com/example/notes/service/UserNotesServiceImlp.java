package com.example.notes.service;

import com.example.notes.entitie.UserNotes;
import com.example.notes.repository.UserNotesRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserNotesServiceImlp implements UserNotesService {

    @Autowired
    private EntityManager entityManager;
    private final UserNotesRepo userNotesRepo;

    @Override
    public List<UserNotes> findByUserIdAndStartDateLike(String userId, String startDate) {
        String queryString = "SELECT un FROM UserNotes un WHERE un.userId = :userId AND DATE(un.startDate) = DATE(:startDate)";
        TypedQuery<UserNotes> query = entityManager.createQuery(queryString, UserNotes.class);
        query.setParameter("userId", userId);
        query.setParameter("startDate", Timestamp.valueOf(startDate + " 00:00:00"));
        return query.getResultList();
    }

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

    @Override
    public List<String> findByUserIdAndYearMonth(String userId) {
        return userNotesRepo.findAllDistinctStartDatesByUserId(userId);
    }
}
