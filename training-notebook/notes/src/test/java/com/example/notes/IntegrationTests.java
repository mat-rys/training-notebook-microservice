package com.example.notes;

import org.springframework.security.test.context.support.WithMockUser;
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
    @WithMockUser(username = "user123")
    public void testGetNoteByNoteId() throws Exception {
        // Given
        UserNotes userNote = UserNotes.builder()
                .title("Test Note")
                .activityType("Test Activity")
                .startDate(new Timestamp(System.currentTimeMillis()))
                .endDate(new Timestamp(System.currentTimeMillis() + 3600000))
                .description("This is a test note.")
                .build();
        UserNotes savedNote = userNotesRepo.save(userNote);

        // When
        mockMvc.perform(MockMvcRequestBuilders.get("/notes/{noteId}", savedNote.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                ).andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Test Note"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.activityType").value("Test Activity"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("This is a test note."));
    }
}
