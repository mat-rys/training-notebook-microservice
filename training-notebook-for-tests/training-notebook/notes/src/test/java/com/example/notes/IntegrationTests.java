package com.example.notes;

import com.example.notes.entitie.UserNotes;
import com.example.notes.repository.UserNotesRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Timestamp;

@SpringBootTest
@AutoConfigureMockMvc
public class IntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserNotesRepo userNotesRepo;

    @Test
    public void testGetNoteByNoteId() throws Exception {
        // Given
        UserNotes userNote = UserNotes.builder()
                .title("Test")
                .activityType("Test")
                .startDate(new Timestamp(System.currentTimeMillis()))
                .endDate(new Timestamp(System.currentTimeMillis() + 3600000))
                .description("This is a test note.")
                .build();
        UserNotes savedNote = userNotesRepo.save(userNote);

        // When
        mockMvc.perform(MockMvcRequestBuilders.get("/notes/{noteId}", savedNote.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                )
                // Then
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Test"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.activityType").value("Test"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("This is a test note."));
    }
}
