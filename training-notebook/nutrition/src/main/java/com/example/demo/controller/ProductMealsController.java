package com.example.demo.controller;

import com.example.demo.dto.MealRecipeDTO;
import com.example.demo.dto.ProductsMealsStatsDTO;
import com.example.demo.entitie.Meals;
import com.example.demo.entitie.ProductsMeals;
import com.example.demo.service.MealsServiceImpl;
import com.example.demo.service.ProductMealsServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigInteger;
import java.security.Principal;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("/nutrition/products-meals")
public class ProductMealsController {

    private final OpenAiChatClient chatClient;
    private final ProductMealsServiceImpl productMealsServiceImpl;
    private final MealsServiceImpl mealsServiceImpl;

    @GetMapping("/user-stats")
    public List<ProductsMealsStatsDTO> getMealStats(Principal principal,
                                                    @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                                    @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return productMealsServiceImpl.getProductsStatsForUser(principal.getName(), startDate, endDate);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductsMeals> getProductMealById(@PathVariable Long id) {
        Optional<ProductsMeals> productMeal = productMealsServiceImpl.getProductMealById(id);
        return productMeal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<ProductsMeals>> getAllProductMeals() {
        List<ProductsMeals> productMeals = productMealsServiceImpl.getAllProductMeals();
        return productMeals != null && !productMeals.isEmpty() ? new ResponseEntity<>(productMeals, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/get-for-meal/{mealId}")
    public ResponseEntity<List<ProductsMeals>> getProductsForMeal(@PathVariable Long mealId) {
        List<ProductsMeals> productMeals = productMealsServiceImpl.getProductsForMeal(mealId);
        return productMeals != null && !productMeals.isEmpty() ? new ResponseEntity<>(productMeals, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete-by-meal/{mealId}")
    public ResponseEntity<Void> deleteProductsByMealId(@PathVariable BigInteger mealId) {
        productMealsServiceImpl.deleteProductsByMealId(mealId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductMeal(@PathVariable Long id) {
        productMealsServiceImpl.deleteProductMeal(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/create-for-meal")
    public ResponseEntity<List<ProductsMeals>> createProductMealsForMeal(@RequestBody List<ProductsMeals> productMeals) {
        List<ProductsMeals> createdProductMeals = productMealsServiceImpl.createProductMealsForMeal(productMeals);
        return createdProductMeals != null && !createdProductMeals.isEmpty() ? new ResponseEntity<>(createdProductMeals, HttpStatus.CREATED) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<ProductsMeals> createProductMeal(@RequestBody ProductsMeals productMeal, @RequestParam Long mealId) {
        Meals meal = mealsServiceImpl.getMealById(mealId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Meal not found"));
        productMeal.setMeals(meal);
        ProductsMeals createdProductMeal = productMealsServiceImpl.createProductMeal(productMeal);
        return new ResponseEntity<>(createdProductMeal, HttpStatus.CREATED);
    }

    @PostMapping("/copy/{id}")
    public ResponseEntity<Meals> copyMeal(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date day,
            @RequestParam Time mealTime,
            Principal principal) {

        // Wyszukiwanie istniejącego posiłku na podstawie id
        Optional<Meals> existingMealOpt = mealsServiceImpl.getMealById(id);

        if (!existingMealOpt.isPresent()) {
            return ResponseEntity.notFound().build(); // Zwraca 404, jeśli posiłek nie istnieje
        }

        Meals existingMeal = existingMealOpt.get();

        // Tworzenie nowego posiłku z danymi z istniejącego posiłku
        Meals newMeal = new Meals();
        newMeal.setTitle(existingMeal.getTitle());
        newMeal.setCalories(existingMeal.getCalories());
        newMeal.setCarbs(existingMeal.getCarbs());
        newMeal.setProtein(existingMeal.getProtein());
        newMeal.setFat(existingMeal.getFat());
        newMeal.setDay(day);
        newMeal.setMealTime(mealTime);
        newMeal.setUserId(principal.getName());

        // Skopiowanie produktów do nowego posiłku
        Set<ProductsMeals> copiedProducts = existingMeal.getProductsMeals().stream()
                .map(product -> {
                    ProductsMeals newProduct = new ProductsMeals();
                    newProduct.setTitle(product.getTitle());
                    newProduct.setCalories(product.getCalories());
                    newProduct.setGrams(product.getGrams());
                    newProduct.setCarbs(product.getCarbs());
                    newProduct.setProtein(product.getProtein());
                    newProduct.setFat(product.getFat());
                    newProduct.setMeals(newMeal); // Ustawienie relacji do nowego posiłku
                    return newProduct;
                })
                .collect(Collectors.toSet());

        // Ustawienie skopiowanych produktów w nowym posiłku
        newMeal.setProductsMeals(copiedProducts);

        // Zapisanie nowego posiłku w bazie danych
        Meals createdMeal = mealsServiceImpl.createMeal(newMeal);

        // Zapisanie skopiowanych produktów w bazie danych
        productMealsServiceImpl.saveAll(new ArrayList<>(copiedProducts)); // Konwersja Set na List

        return new ResponseEntity<>(createdMeal, HttpStatus.CREATED);
    }

    @PostMapping("/add-meal-recipe")
    public ResponseEntity<Meals> addMeal(@RequestBody MealRecipeDTO mealRecipeDTO, Principal principal) {
        Meals newMeal = new Meals();
        newMeal.setTitle(mealRecipeDTO.getTitle());
        newMeal.setUserId(principal.getName());

        // Ustawienie daty i czasu
        try {
            String dateTimeString = String.valueOf(mealRecipeDTO.getDay());
            SimpleDateFormat dateTimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            java.util.Date parsedDateTime = dateTimeFormat.parse(dateTimeString);
            newMeal.setDay(new Date(parsedDateTime.getTime()));

            String mealTimeString = mealRecipeDTO.getMealTime();
            SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
            java.util.Date parsedTime = timeFormat.parse(mealTimeString);
            newMeal.setMealTime(new Time(parsedTime.getTime()));
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body(null);
        }

        // Tworzenie nowego posiłku
        Meals createdMeal = mealsServiceImpl.createMeal(newMeal);

        // Generowanie produktów do posiłku
        String message = "Na podstawie podanych produktów z posiłku: " + mealRecipeDTO.getMealAdviceInfo() +
                ". Proszę o zwrócenie danych produktów w formacie tekstowym, gdzie każdy produkt będzie zapisany w osobnej linii w następującym formacie: " +
                "Nazwa: {nazwa}, Kalorie: {kalorie}, Gramy: {gramy}, Węglowodany: {węglowodany}, Białko: {białko}, Tłuszcz: {tłuszcz}. " +
                "Nie dodawaj ID ani losowych danych.";

        String productsText;
        try {
            productsText = chatClient.call(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        List<ProductsMeals> productsList = new ArrayList<>();
        double totalCalories = 0.0;
        double totalCarbs = 0.0;
        double totalProtein = 0.0;
        double totalFat = 0.0;

        String[] productLines = productsText.split("\n");
        for (String line : productLines) {
            String[] parts = line.split(", ");
            if (parts.length == 6) {
                try {
                    String title = parts[0].split(": ")[1];

                    // Użyj wyrażenia regularnego do usunięcia niecyfrowych znaków
                    Double calories = Double.valueOf(parts[1].split(": ")[1].replaceAll("[^\\d.]", "").trim());
                    Integer grams = Integer.valueOf(parts[2].split(": ")[1].replaceAll("[^\\d]", "").trim());
                    Double carbs = Double.valueOf(parts[3].split(": ")[1].replaceAll("[^\\d.]", "").trim());
                    Double protein = Double.valueOf(parts[4].split(": ")[1].replaceAll("[^\\d.]", "").trim());
                    Double fat = Double.valueOf(parts[5].split(": ")[1].replaceAll("[^\\d.]", "").trim());

                    // Dodaj wartości odżywcze do sum
                    totalCalories += calories;
                    totalCarbs += carbs;
                    totalProtein += protein;
                    totalFat += fat;

                    // Tworzenie nowego obiektu produktu
                    ProductsMeals product = new ProductsMeals(title, calories, grams, carbs, protein, fat);
                    product.setMeals(createdMeal);
                    productsList.add(product);

                } catch (NumberFormatException e) {
                    System.out.println("Nieprawidłowy format liczby w linii: " + line + " - " + e.getMessage());
                }
            } else {
                System.out.println("Otrzymano nieprawidłowy format dla linii: " + line);
            }
        }

        // Zapisanie produktów do bazy danych
        productMealsServiceImpl.saveAll(productsList);

        // Ustawienie wartości odżywczych w posiłku
        createdMeal.setCalories(totalCalories);
        createdMeal.setCarbs(totalCarbs);
        createdMeal.setProtein(totalProtein);
        createdMeal.setFat(totalFat);

        // Powiązanie produktów z posiłkiem
        createdMeal.setProductsMeals(new HashSet<>(productsList));

        // Zaktualizowanie posiłku w bazie danych
        mealsServiceImpl.updateMealData(createdMeal.getId(), createdMeal); // Użycie metody update

        // Zwrócenie odpowiedzi z utworzonym posiłkiem
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMeal);
    }


}
