package com.example.notes;

import com.example.notes.dto.ActivityCountDTO;
import com.example.notes.entitie.UserNotes;
import com.example.notes.service.UserNotesServiceImlp;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.sql.Timestamp;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UserNotesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserNotesServiceImlp userNotesService;

    @Autowired
    private ObjectMapper objectMapper;

    private String gatewayToken = "SecureToken123";
    private String jwtToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwdXBScS1sUGNNR01fOXFyempaNW96c19UQzVDTHNGMjhaSjl2QmZoRVR3In0.eyJleHAiOjE3MzM4NzIxMzAsImlhdCI6MTczMzg3MTg5MCwianRpIjoiM2FkNmY2OTYtM2VkMS00ZDc2LWE0NjQtM2E2Y2MyNjY1NDE3IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTkxL2F1dGgvcmVhbG1zL3RyYWluaW5nLW5vdGVib29rLW1pY3Jvc2VydmljZS1yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI0OTBjMzk1MS1lZTY4LTRmZWEtYmRiNi1lYmFhYjViNTBiOGMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiYWNrZW5kIiwic2Vzc2lvbl9zdGF0ZSI6Ijg5OTg5OGZkLTUzY2EtNDYzZC05NDMwLTU5MDg5OTczZmYxMCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo0MjAwIiwiaHR0cDovL2xvY2FsaG9zdDo4MjIyIiwiaHR0cDovL2xvY2FsaG9zdDo4MTAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXRyYWluaW5nLW5vdGVib29rLW1pY3Jvc2VydmljZS1yZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiODk5ODk4ZmQtNTNjYS00NjNkLTk0MzAtNTkwODk5NzNmZjEwIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJhYWEgc3NzIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidHR0IiwiZ2l2ZW5fbmFtZSI6ImFhYSIsImZhbWlseV9uYW1lIjoic3NzIiwiZW1haWwiOiJ0dHRAd3AucGwifQ.M_2ID-Lyz88mooez5hGRRwCUOw8uhUv2dQxvvzil7jJk15n6cSlDPbjF7Y7Ne1TeUzpC_VEbF6KxOgq9jj0NPclIUz3uyNNGyfxAu-3HjzRxNAuJ-ZzsKm52ntgso3qRNZqWWDscL16i0kb91bkVGQEMV1s9cSMRvZfatNXx-w9D2h2mvb9uGEX87IcVPCxy_2Z7Ni0DsNZNUl3Z9jneumqmepeSHfJJx2IqM0EDv0NazfSyAwfZegofoy5bk-6gLwuYS3AIaDTd_0bYOdyc1NVFYMuo11PKXZbvkyzhRA_EK3D3RFUdUy2y3nJDvkR92v9pHO8CsV9cQmJ0e7c78Q";



    private static List<String> testResults = new ArrayList<>();

    @BeforeEach
    void setUp() {
        // Można dodać inicjalizację przed każdym testem, np. przygotowanie danych w bazie
    }

    // Test case for creating a note
    @Test
    void shouldCreateNote() throws Exception {
        // Przygotowujemy obiekt notatki
        UserNotes note = UserNotes.builder()
                .title("Meeting Notes")
                .description("Discuss project milestones")
                .build();

        // Symulujemy, że obiekt zyskany z bazy danych ma przypisane `id`
        note.setId(1L);  // Przypisujemy id, które powinno zostać wygenerowane przez repozytorium

        // Mockujemy serwis, aby zwrócił naszą notatkę z przypisanym id
        Mockito.when(userNotesService.createNote(Mockito.any(UserNotes.class)))
                .thenReturn(note);

        // Wykonujemy żądanie POST do kontrolera i sprawdzamy odpowiedź
        mockMvc.perform(post("/notes")
                        .header("X-Gateway-Token", "SecureToken123")  // Dodaj poprawny token
                        .header("Authorization", "Bearer " + jwtToken)  // Dodaj poprawny JWT token
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(note)))
                .andExpect(status().isOk())  // Spodziewamy się statusu 200 OK
                .andExpect(jsonPath("$.id").value(1L))  // Sprawdzamy, czy id jest ustawione
                .andExpect(jsonPath("$.title").value("Meeting Notes"))
                .andExpect(jsonPath("$.description").value("Discuss project milestones"));

        testResults.add("shouldCreateNote: PASSED - Notes created successfully.");
    }


    @Test
    void shouldGetAllNotes() throws Exception {
        // Tworzymy przykładowe notatki
        UserNotes note1 = UserNotes.builder()
                .id(1L)
                .title("Meeting Notes")
                .description("Discuss milestones for the project")
                .startDate(Timestamp.valueOf("2024-12-01 10:00:00"))
                .endDate(Timestamp.valueOf("2024-12-01 11:00:00"))
                .userId("user123")
                .build();

        UserNotes note2 = UserNotes.builder()
                .id(2L)
                .title("Team Sync")
                .description("Sync up for the sprint")
                .startDate(Timestamp.valueOf("2024-12-02 11:00:00"))
                .endDate(Timestamp.valueOf("2024-12-02 12:00:00"))
                .userId("user123")
                .build();

        // Mockowanie odpowiedzi serwisu
        Mockito.when(userNotesService.getNotes()).thenReturn(new HashSet<>(Arrays.asList(note1, note2)));


        // Wykonujemy żądanie GET
        mockMvc.perform(get("/notes")
                        .header("X-Gateway-Token", "SecureToken123")
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(2))); // Sprawdzanie liczby elementów

        testResults.add("shouldGetAllNotes: PASSED - Retrieved all notes successfully.");

    }

    @Test
    void shouldGetNoteByNoteId() throws Exception {
        // Tworzymy przykładową notatkę
        UserNotes note = UserNotes.builder()
                .id(1L)
                .title("Meeting Notes")
                .description("Discuss milestones for the project")
                .startDate(Timestamp.valueOf("2024-12-01 10:00:00"))
                .endDate(Timestamp.valueOf("2024-12-01 11:00:00"))
                .userId("user123")
                .build();

        // Mockowanie odpowiedzi serwisu
        Mockito.when(userNotesService.getNote(1L)).thenReturn(Optional.of(note));

        // Wykonujemy żądanie GET
        mockMvc.perform(get("/notes/1")
                        .header("X-Gateway-Token", "SecureToken123")
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("Meeting Notes"))
                .andExpect(jsonPath("$.description").value("Discuss milestones for the project"))
                .andExpect(jsonPath("$.startDate").value("2024-12-01T09:00:00.000+00:00"))
                .andExpect(jsonPath("$.endDate").value("2024-12-01T10:00:00.000+00:00"))
                .andExpect(jsonPath("$.userId").value("user123"));

        testResults.add("shouldGetNoteByNoteId: PASSED - Retrieved note by noteId successfully.");

    }

    // Test case for deleting a note
    @Test
    void shouldDeleteNote() throws Exception {
        Long noteId = 1L;
        Mockito.doNothing().when(userNotesService).deleteNote(noteId);

        mockMvc.perform(delete("/notes/" + noteId)
                        .header("X-Gateway-Token", gatewayToken)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk());
Q
        // Logowanie wyniku testu
        testResults.add("shouldDeleteNote: PASSED - Deletes the note successfully.");
    }

    // Metoda do logowania wyników po każdym teście
    @AfterEach
    public void logTestResults() {
        if (!testResults.isEmpty()) {
            String lastTestResult = testResults.get(testResults.size() - 1);
            String regex = "^(.*?):\\s*(PASSED|FAILED)\\s*-\\s*(.*)$";
            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(lastTestResult);

            if (matcher.matches()) {
                String testName = matcher.group(1).trim();
                String status = matcher.group(2).trim();
                String description = matcher.group(3).trim();

                System.out.println(String.format("| %-25s | %-10s | %-50s |", testName, status, description));
            } else {
                System.err.println("Invalid test result format: " + lastTestResult);
            }
        } else {
            System.err.println("No test results found to log.");
        }
    }

    @AfterAll
    public static void printFinalResults() {
        System.out.println("\n=== Test Results Summary ===");
        System.out.println("|---------------------------|-----------|----------------------------------------------------|");
        System.out.println("| Test Name                 | Status    | Description                                        |");
        System.out.println("|---------------------------|-----------|----------------------------------------------------|");

        String regex = "^(.*?):\\s*(PASSED|FAILED)\\s*-\\s*(.*)$";
        Pattern pattern = Pattern.compile(regex);

        for (String result : testResults) {
            Matcher matcher = pattern.matcher(result);
            if (matcher.matches()) {
                String testName = matcher.group(1).trim();
                String status = matcher.group(2).trim();
                String description = matcher.group(3).trim();
                System.out.println(String.format("| %-25s | %-10s | %-50s |", testName, status, description));
            } else {
                System.err.println("Invalid test result format: " + result);
            }
        }
        System.out.println("|---------------------------|-----------|----------------------------------------------------|");
    }

}
