package com.example.notes;

import com.example.notes.controller.UserNotesController;
import com.example.notes.entitie.UserNotes;
import com.example.notes.service.UserNotesService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.any;
import java.security.Principal;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class NotesApplicationTests {

	@Autowired
	private UserNotesController userNotesController;
	private ObjectMapper objectMapper = new ObjectMapper();
	private MockMvc mockMvc;

	@MockBean
	private UserNotesService userNotesService;

	@BeforeEach
	public void setup(TestInfo testInfo) {
		System.out.printf("-- METODA -> %s%n", testInfo.getTestMethod().get().getName());
		objectMapper.registerModule(new JavaTimeModule());
		objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
		JacksonTester.initFields(this, objectMapper);

	}

	@AfterEach
	public void after(TestInfo testInfo) {
		System.out.printf("<- KONIEC -- %s%n", testInfo.getTestMethod().get().getName());
	}


	@Test
	public void deleteNoteById_ShouldReturnOkStatusWhenNoteExists() {
		// Given
		Long noteId = 1L;

		// When
		Mockito.doNothing().when(userNotesService).deleteNote(noteId);
		ResponseEntity<Void> response = userNotesController.deleteNoteById(noteId);

		// Then
		assertEquals(HttpStatus.OK, response.getStatusCode());
	}

	@Test
	public void deleteNoteById_ShouldReturnNotFoundStatusWhenNoteDoesNotExist() {
		// Given
		Long noteId = 1L;

		// When
		Mockito.doThrow(new EmptyResultDataAccessException(1)).when(userNotesService).deleteNote(noteId);
		ResponseEntity<Void> response = userNotesController.deleteNoteById(noteId);

		// Then
		assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@Test
	public void getAllNotes_ShouldReturnAllNotes() {
		// Given
		UserNotes note1 = new UserNotes(1L, "Title 1", "ActivityType1", Timestamp.valueOf("2023-07-01 12:00:00"),
				Timestamp.valueOf("2023-07-02 12:00:00"), "Description 1", "User1");
		UserNotes note2 = new UserNotes(2L, "Title 2", "ActivityType2", Timestamp.valueOf("2023-07-03 12:00:00"),
				Timestamp.valueOf("2023-07-04 12:00:00"), "Description 2", "User1");

		Set<UserNotes> notes = new HashSet<>();
		notes.add(note1);
		notes.add(note2);

		Mockito.when(userNotesService.getNotes()).thenReturn(notes); // Zwracamy zbiór, nie strumień

		// When
		ResponseEntity<Stream<UserNotes>> response = userNotesController.getAllNotes();
		Stream<UserNotes> result = response.getBody();

		// Then
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertNotNull(result);

		// Skonwertuj strumień do zbioru i przeprowadź asercje
		Set<UserNotes> resultSet = result.collect(Collectors.toSet());
		assertEquals(2, resultSet.size());
		assertTrue(resultSet.contains(note1));
		assertTrue(resultSet.contains(note2));
	}



	@Test
	public void createNote_ShouldSetUserIdAndCallServiceMethod() {
		// Given
		UserNotes userNotes = new UserNotes("New Title", "New ActivityType", Timestamp.valueOf("2023-07-05 12:00:00"),
				Timestamp.valueOf("2023-07-06 12:00:00"), "New Description");

		Principal principal = Mockito.mock(Principal.class);
		Mockito.when(principal.getName()).thenReturn("User1");

		// When
		userNotesController.createNote(userNotes, principal);

		// Then
		assertEquals("User1", userNotes.getUserId());
		Mockito.verify(userNotesService).createNote(userNotes);
	}

	@Test
	public void testUpdateNote_ExistingNote_Success() throws Exception {
		// Given
		Long noteId = 1L;
		UserNotes existingNote = new UserNotes(1L, "Title 1", "ActivityType1",
				Timestamp.valueOf("2023-07-01 12:00:00"), Timestamp.valueOf("2023-07-02 12:00:00"),
				"Description 1", "User1");

		UserNotes updatedNote = new UserNotes(1L, "Updated Title", "Updated ActivityType",
				Timestamp.valueOf("2023-07-03 12:00:00"), Timestamp.valueOf("2023-07-04 12:00:00"),
				"Updated Description", "User1");

		when(userNotesService.updateNote(anyLong(), any(UserNotes.class))).thenReturn(updatedNote);

		// When
		ResponseEntity<UserNotes> response = userNotesController.updateNote(noteId, updatedNote);

		// Then
		assertEquals(HttpStatus.OK, response.getStatusCode());
		UserNotes resultNote = response.getBody();
		assertNotNull(resultNote);
		assertEquals(noteId, resultNote.getId());
		assertEquals("Updated Title", resultNote.getTitle());
		assertEquals("Updated ActivityType", resultNote.getActivityType());
		assertEquals(Timestamp.valueOf("2023-07-03 12:00:00"), resultNote.getStartDate());
		assertEquals(Timestamp.valueOf("2023-07-04 12:00:00"), resultNote.getEndDate());
		assertEquals("Updated Description", resultNote.getDescription());
		assertEquals("User1", resultNote.getUserId());
	}



}
