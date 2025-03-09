package com.example.notes.service;

import com.example.notes.dto.ActivityCountDTO;
import com.example.notes.dto.ActivityTypeCountDTO;
import com.example.notes.dto.DailyNoteCountDTO;
import com.example.notes.dto.UserNoteDTO;
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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

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

    @Override
    public List<ActivityTypeCountDTO> getActivityCountsByUserIdAndDateRange(String userId, Date fromDate, Date toDate) {
        // Konwersja Date na Timestamp w serwisie
        Timestamp fromTimestamp = new Timestamp(fromDate.getTime());
        Timestamp toTimestamp = new Timestamp(toDate.getTime());

        // Pobranie wyników z repozytorium (przykładowe zapytanie)
        List<Object[]> result = userNotesRepo.findActivityTypeCountsByUserIdAndDateRange(userId, fromTimestamp, toTimestamp);

        // Konwersja wyników na DTO
        return result.stream()
                .map(row -> new ActivityTypeCountDTO((String) row[0], ((Long) row[1]).intValue())) // Konwersja Long na Integer
                .collect(Collectors.toList());
    }

    @Override
    public List<ActivityCountDTO> getActivityCountsByWeekday(String userId, Date fromDate, Date toDate) {
        // Ustawienie fromDate na 00:00:00
        Timestamp fromTimestamp = new Timestamp(fromDate.getTime());
        Calendar calFrom = Calendar.getInstance();
        calFrom.setTime(fromTimestamp);
        calFrom.set(Calendar.HOUR_OF_DAY, 0);
        calFrom.set(Calendar.MINUTE, 0);
        calFrom.set(Calendar.SECOND, 0);
        calFrom.set(Calendar.MILLISECOND, 0);
        fromTimestamp = new Timestamp(calFrom.getTimeInMillis());

        // Ustawienie toDate na 23:59:59
        Timestamp toTimestamp = new Timestamp(toDate.getTime());
        Calendar calTo = Calendar.getInstance();
        calTo.setTime(toTimestamp);
        calTo.set(Calendar.HOUR_OF_DAY, 23);
        calTo.set(Calendar.MINUTE, 59);
        calTo.set(Calendar.SECOND, 59);
        calTo.set(Calendar.MILLISECOND, 999);
        toTimestamp = new Timestamp(calTo.getTimeInMillis());

        // Uzyskiwanie danych z repozytorium
        List<Object[]> results = userNotesRepo.findActivityCountByUserIdAndWeekday(userId, fromTimestamp, toTimestamp);

        // Mapowanie wyników do DTO
        Map<String, Map<String, Integer>> activitiesByDay = new LinkedHashMap<>();
        for (Object[] result : results) {
            String dayOfWeek = (String) result[0].toString().trim(); // Dzień tygodnia
            String activityType = (String) result[1]; // Typ aktywności
            int count = ((Number) result[2]).intValue(); // Liczba wystąpień

            // Konwersja angielskiego dnia tygodnia na polski
            dayOfWeek = convertDayToPolish(dayOfWeek);

            // Dodawanie do mapy
            activitiesByDay.computeIfAbsent(dayOfWeek, k -> new HashMap<>())
                    .put(activityType, count);
        }

        // Konwertowanie mapy do listy DTO
        List<ActivityCountDTO> activityCounts = new ArrayList<>();
        for (Map.Entry<String, Map<String, Integer>> entry : activitiesByDay.entrySet()) {
            activityCounts.add(new ActivityCountDTO(entry.getKey(), entry.getValue()));
        }

        return activityCounts;
    }

    @Override
    public List<DailyNoteCountDTO> getDailyNoteCounts(String userId, Date fromDate, Date toDate) {
        // Format dates appropriately
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Timestamp fromTimestamp;
        Timestamp toTimestamp;

        try {
            // Convert dates from String to Timestamp
            fromTimestamp = new Timestamp(dateFormat.parse(dateFormat.format(fromDate)).getTime());
            toTimestamp = new Timestamp(dateFormat.parse(dateFormat.format(toDate)).getTime());
        } catch (ParseException e) {
            e.printStackTrace();
            return new ArrayList<>(); // Return an empty list on error
        }

        // Call the repository method
        return userNotesRepo.findDailyNoteCountsByUserIdAndDateRange(userId, fromTimestamp, toTimestamp);
    }


    // Metoda konwertująca dni tygodnia na polski
    private String convertDayToPolish(String dayOfWeek) {
        switch (dayOfWeek.toLowerCase()) {
            case "sunday":
                return "Niedziela";
            case "monday":
                return "Poniedziałek";
            case "tuesday":
                return "Wtorek";
            case "wednesday":
                return "Środa";
            case "thursday":
                return "Czwartek";
            case "friday":
                return "Piątek";
            case "saturday":
                return "Sobota";
            default:
                return dayOfWeek; // W razie błędu zwróć oryginalny ciąg
        }
    }

}
