package com.example.calculator;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.security.Principal;
import java.util.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.calculator.bmi.entitie.BMIRecord;
import com.example.calculator.bmi.controller.BMIRecordController;
import com.example.calculator.bmi.repository.BMIRecordRepo;
import com.example.calculator.bmi.service.BMIRecordServiceImlp;
import java.util.Optional;
import static org.mockito.Mockito.when;

public class BMIRecordControllerTests {

	@Mock
	private BMIRecordRepo bmiRecordRepo;

	@InjectMocks
	private BMIRecordServiceImlp bmiRecordService;

	@InjectMocks
	private BMIRecordController bmiRecordController;

	@BeforeEach
	public void setup(TestInfo testInfo) {
		System.out.printf("-- METODA -> %s%n", testInfo.getTestMethod().get().getName());
		MockitoAnnotations.openMocks(this);
		bmiRecordController = new BMIRecordController(bmiRecordService);
	}

	@AfterEach
	public void after(TestInfo testInfo) {
		System.out.printf("<- KONIEC -- %s%n", testInfo.getTestMethod().get().getName());
	}


	@Test
	public void testGetBMIRecord_Success() {
		// Given
		Long id = 1L;
		BMIRecord bmiRecord = new BMIRecord(1L, 170, 70, 24.22, "Normal Weight", "user1");

		when(bmiRecordRepo.findById(id)).thenReturn(Optional.of(bmiRecord));

		// When
		ResponseEntity<BMIRecord> response = bmiRecordController.getBMIRecord(id);

		// Then
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(bmiRecord, response.getBody());
	}

	@Test
	public void testGetBMIRecord_NotFound() {
		// Given
		Long id = 1L;

		when(bmiRecordRepo.findById(id)).thenReturn(Optional.empty());

		// When
		ResponseEntity<BMIRecord> response = bmiRecordController.getBMIRecord(id);

		// Then
		assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
		assertNull(response.getBody());
	}
	@Test
	public void testSetBMIRecord_Success() {
		// Given
		BMIRecord bmiRecord = new BMIRecord(170, 70, 24.22, "Normal Weight", "user1");
		Principal principal = mock(Principal.class);
		when(principal.getName()).thenReturn("user1");

		when(bmiRecordRepo.save(any(BMIRecord.class))).thenReturn(bmiRecord);

		// When
		ResponseEntity<BMIRecord> response = bmiRecordController.createBMIRecord(bmiRecord, principal);

		// Then
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(bmiRecord, response.getBody());
	}


	@Test
	public void testDeleteBMIRecord_Success() {
		// Given
		Long id = 1L;

		// When
		ResponseEntity<Void> response = bmiRecordController.deleteBMIRecord(id);

		// Then
		assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
		assertNull(response.getBody());

		verify(bmiRecordRepo, times(1)).deleteById(id);
	}

	@Test
	public void testGetBMIRecords_Success() {
		// Given
		List<BMIRecord> bmiRecords = new ArrayList<>();
		bmiRecords.add(new BMIRecord(1L, 170, 70, 24.22, "Normal Weight", "user1"));
		bmiRecords.add(new BMIRecord(2L, 165, 60, 22.04, "Normal Weight", "user1"));

		when(bmiRecordRepo.findAll()).thenReturn(bmiRecords);

		// When
		ResponseEntity<List<BMIRecord>> response = bmiRecordController.getBMIRecords();

		// Then
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(bmiRecords, response.getBody());
	}

	@Test
	public void testGetBmiByUserId_Success() {
		// Given
		String userId = "user1";
		BMIRecord bmiRecord1 = new BMIRecord(1L, 170, 70, 24.22, "Normal Weight", "user1");
		BMIRecord bmiRecord2 = new BMIRecord(2L, 165, 60, 22.04, "Normal Weight", "user1");

		Set<BMIRecord> bmiRecords = new HashSet<>();
		bmiRecords.add(bmiRecord1);
		bmiRecords.add(bmiRecord2);

		when(bmiRecordRepo.findByUserId(userId)).thenReturn(new ArrayList<>(bmiRecords));

		// When
		ResponseEntity<Set<BMIRecord>> response = bmiRecordController.getBmiByUserId(userId);

		// Then
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertNotNull(response.getBody());

		Set<BMIRecord> responseBody = response.getBody();
		assertEquals(2, responseBody.size());
		assertEquals(bmiRecords, responseBody);
	}

	@Test
	void testUpdateBMIRecord_Success() {
		// Given
		Long id = 1L;
		BMIRecord existingBMIRecord = new BMIRecord(170, 70, 24.22, "Normal Weight", "user1");
		BMIRecord updatedBMIRecord = new BMIRecord(180, 80, 24.69, "Normal Weight", "user2");

		when(bmiRecordRepo.findById(id)).thenReturn(Optional.of(existingBMIRecord));
		when(bmiRecordRepo.save(any(BMIRecord.class))).thenReturn(updatedBMIRecord);

		// When
		bmiRecordService.updateBMIRecord(id, updatedBMIRecord);

		// Then
		assertEquals(180, existingBMIRecord.getHeight());
		assertEquals(80, existingBMIRecord.getWeight());
		assertEquals(24.69, existingBMIRecord.getBmiValue());
		assertEquals("Normal Weight", existingBMIRecord.getBmiCategory());
		assertEquals("user2", existingBMIRecord.getUserId());

		verify(bmiRecordRepo).findById(id);
		verify(bmiRecordRepo).save(existingBMIRecord);
	}

}



