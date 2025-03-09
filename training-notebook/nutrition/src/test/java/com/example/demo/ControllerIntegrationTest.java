package com.example.demo;

import com.example.demo.controller.MealsController;
import com.example.demo.controller.ProductMealsController;
import com.example.demo.dto.*;
import com.example.demo.entitie.Meals;
import com.example.demo.entitie.Products;
import com.example.demo.entitie.ProductsMeals;
import com.example.demo.service.MealsServiceImpl;
import com.example.demo.service.ProductMealsServiceImpl;
import com.example.demo.service.ProductsServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.math.stat.descriptive.summary.Product;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigInteger;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.mockito.ArgumentMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MealsServiceImpl mealsServiceImpl;

    @MockBean
    private ProductsServiceImpl productsServiceImpl;

    @Autowired
    private ObjectMapper objectMapper;

    private String gatewayToken = "SecureToken123";
    private String jwtToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwdXBScS1sUGNNR01fOXFyempaNW96c19UQzVDTHNGMjhaSjl2QmZoRVR3In0.eyJleHAiOjE3MzM4NjI2NzIsImlhdCI6MTczMzg2MjQzMiwianRpIjoiNzI0NTcyZjctY2Q3Ny00MzVlLTk1NzUtNWNkOTBhNWI4ZjQwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTkxL2F1dGgvcmVhbG1zL3RyYWluaW5nLW5vdGVib29rLW1pY3Jvc2VydmljZS1yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI0OTBjMzk1MS1lZTY4LTRmZWEtYmRiNi1lYmFhYjViNTBiOGMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiYWNrZW5kIiwic2Vzc2lvbl9zdGF0ZSI6ImY2YTM4NTVhLWY3MGMtNGViMy1hNTg0LTFlMThjYTBiNTI4ZSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo0MjAwIiwiaHR0cDovL2xvY2FsaG9zdDo4MjIyIiwiaHR0cDovL2xvY2FsaG9zdDo4MTAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXRyYWluaW5nLW5vdGVib29rLW1pY3Jvc2VydmljZS1yZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiZjZhMzg1NWEtZjcwYy00ZWIzLWE1ODQtMWUxOGNhMGI1MjhlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJhYWEgc3NzIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidHR0IiwiZ2l2ZW5fbmFtZSI6ImFhYSIsImZhbWlseV9uYW1lIjoic3NzIiwiZW1haWwiOiJ0dHRAd3AucGwifQ.A59_8F4Cq2HctyBF0eyeS-RZ_jlub9wVjLCgqRe1yVlkBkkDAOs1ZJHHpCQ6HvPaZmQkTRwA0cmkf36AUf6k0i1iH2ogu-BUcam7MhFeiM6t91V2CxufUyf6RTjGV4VD_iZGpWvY2sKF68JrfCe40ol6wGQ_mpBru8-IEiqdjJW_a3DmOxuEBIx0fRTWINLFazl67zFNQCTfl9OJChm9qD2mQOx9PA7M15FCbPiLg3Zr7IjAcLbvlQBLSzEfk23Q22Ha7cWGqBPOH7_5DCNEZaMpNHLwfBMGfj4sGjGlNqGLKn4PzczLUu3Vg6xX-I08F1VI3NYgjNkBPZBXJy54fQ";

    private static List<String> testResults = new ArrayList<>();

    // Test case for creating a meal
    @Test
    void shouldCreateMeal() throws Exception {
        Meals meal = Meals.builder()
                .title("Lunch")
                .day(new Date())
                .mealTime(new Time(System.currentTimeMillis()))
                .build();

        Meals createdMeal = Meals.builder()
                .id(1L)
                .userId("testUser")
                .title("Lunch")
                .day(new Date())
                .mealTime(new Time(System.currentTimeMillis()))
                .build();

        Mockito.when(mealsServiceImpl.createMeal(any(Meals.class)))
                .thenReturn(createdMeal);

        mockMvc.perform(post("/nutrition/meals")
                        .header("X-Gateway-Token", gatewayToken)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(meal)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.userId").value("testUser"))
                .andExpect(jsonPath("$.title").value("Lunch"));

        testResults.add("shouldCreateMeal: PASSED - Creates a meal and checks the response.");
    }

    // Test case for deleting a meal
    @Test
    void shouldDeleteMeal() throws Exception {
        Long mealId = 1L;
        Mockito.doNothing().when(mealsServiceImpl).deleteMeal(mealId);

        mockMvc.perform(delete("/nutrition/meals/" + mealId)
                        .header("X-Gateway-Token", gatewayToken)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNoContent());

        testResults.add("shouldDeleteMeal: PASSED - Verifies the deletion of a meal.");
    }

    // Test case for retrieving a meal by ID
    @Test
    void shouldGetMealsByDay() throws Exception {
        Date testDay = new SimpleDateFormat("yyyy-MM-dd").parse("2024-12-10");

        Meals meal1 = Meals.builder()
                .id(1L)
                .userId("testUser1")
                .title("Breakfast")
                .day(testDay)
                .mealTime(new Time(System.currentTimeMillis()))
                .build();

        Meals meal2 = Meals.builder()
                .id(2L)
                .userId("testUser2")
                .title("Lunch")
                .day(testDay)
                .mealTime(new Time(System.currentTimeMillis()))
                .build();

        List<Meals> mealsList = Arrays.asList(meal1, meal2);

        Mockito.when(mealsServiceImpl.getMealsByDay(Mockito.any(Date.class)))
                .thenReturn(mealsList);

        mockMvc.perform(get("/nutrition/meals/day")
                        .header("X-Gateway-Token", gatewayToken)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testDay))) // Serialize the Date to JSON
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].title").value("Breakfast"))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andExpect(jsonPath("$[1].title").value("Lunch"));

        testResults.add("shouldGetMealsByDay: PASSED - Retrieves meals by a specific day.");
    }


    // Test case for creating a product
    @Test
    void shouldCreateProduct() throws Exception {
        Products product = Products.builder()
                .title("Apple")
                .calories(52.0)
                .grams(100)
                .carbs(14.0)
                .protein(0.3)
                .fat(0.2)
                .build();

        Products createdProduct = Products.builder()
                .id(1L)
                .title("Apple")
                .calories(52.0)
                .grams(100)
                .carbs(14.0)
                .protein(0.3)
                .fat(0.2)
                .build();

        Mockito.when(productsServiceImpl.createProduct(any(Products.class)))
                .thenReturn(createdProduct);

        mockMvc.perform(post("/nutrition/products")
                        .header("X-Gateway-Token", gatewayToken)
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(product)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("Apple"))
                .andExpect(jsonPath("$.calories").value(52.0))
                .andExpect(jsonPath("$.grams").value(100))
                .andExpect(jsonPath("$.carbs").value(14.0))
                .andExpect(jsonPath("$.protein").value(0.3))
                .andExpect(jsonPath("$.fat").value(0.2));

        testResults.add("shouldCreateProduct: PASSED - Creates a product and checks the response.");
    }


    // Test case for deleting a product
    @Test
    void shouldDeleteProduct() throws Exception {
        Long productId = 1L;
        Mockito.doNothing().when(productsServiceImpl).deleteProduct(productId);

        mockMvc.perform(delete("/nutrition/products/" + productId)
                        .header("X-Gateway-Token", gatewayToken)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNoContent());

        testResults.add("shouldDeleteProduct: PASSED - Verifies the deletion of a product.");
    }

    // Test case for retrieving a product by ID
    @Test
    void shouldGetProductById() throws Exception {
        Long productId = 1L;
        Products product = Products.builder()
                .id(productId)
                .title("Apple")
                .calories(52.0)
                .grams(100)
                .carbs(14.0)
                .protein(0.3)
                .fat(0.2)
                .build();

        Mockito.when(productsServiceImpl.getProductById(productId))
                .thenReturn(Optional.of(product));

        mockMvc.perform(get("/nutrition/products/" + productId)
                        .header("X-Gateway-Token", gatewayToken)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(productId))
                .andExpect(jsonPath("$.title").value("Apple"))
                .andExpect(jsonPath("$.calories").value(52.0))
                .andExpect(jsonPath("$.grams").value(100))
                .andExpect(jsonPath("$.carbs").value(14.0))
                .andExpect(jsonPath("$.protein").value(0.3))
                .andExpect(jsonPath("$.fat").value(0.2));

        testResults.add("shouldGetProductById: PASSED - Retrieves a product by its ID.");
    }


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
        System.out.println("=== Test Results Summary ===");
        System.out.println("| Test Name               | Status    | Description                                        |");
        System.out.println("|-------------------------|-----------|----------------------------------------------------|");

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
    }
}