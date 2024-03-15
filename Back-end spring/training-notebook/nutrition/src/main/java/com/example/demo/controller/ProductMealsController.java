package com.example.demo.controller;

import com.example.demo.dto.ProductsMealsStatsDTO;
import com.example.demo.entitie.Meals;
import com.example.demo.entitie.ProductsMeals;
import com.example.demo.service.MealsService;
import com.example.demo.service.ProductMealsService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigInteger;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/nutrition/products-meals")
public class ProductMealsController {

    private final ProductMealsService productMealsService;
    private final MealsService mealsService;
    @GetMapping("/user-stats")
    public List<ProductsMealsStatsDTO> getMealStats(Principal principal,
                                                    @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                                    @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return productMealsService.getProductsStatsForUser(principal.getName(), startDate, endDate);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductsMeals> getProductMealById(@PathVariable Long id) {
        Optional<ProductsMeals> productMeal = productMealsService.getProductMealById(id);
        return productMeal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<ProductsMeals>> getAllProductMeals() {
        List<ProductsMeals> productMeals = productMealsService.getAllProductMeals();
        return productMeals != null && !productMeals.isEmpty() ? new ResponseEntity<>(productMeals, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/get-for-meal/{mealId}")
    public ResponseEntity<List<ProductsMeals>> getProductsForMeal(@PathVariable Long mealId) {
        List<ProductsMeals> productMeals = productMealsService.getProductsForMeal(mealId);
        return productMeals != null && !productMeals.isEmpty() ? new ResponseEntity<>(productMeals, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete-by-meal/{mealId}")
    public ResponseEntity<Void> deleteProductsByMealId(@PathVariable BigInteger mealId) {
        productMealsService.deleteProductsByMealId(mealId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductMeal(@PathVariable Long id) {
        productMealsService.deleteProductMeal(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/create-for-meal")
    public ResponseEntity<List<ProductsMeals>> createProductMealsForMeal(@RequestBody List<ProductsMeals> productMeals) {
        List<ProductsMeals> createdProductMeals = productMealsService.createProductMealsForMeal(productMeals);
        return createdProductMeals != null && !createdProductMeals.isEmpty() ? new ResponseEntity<>(createdProductMeals, HttpStatus.CREATED) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<ProductsMeals> createProductMeal(@RequestBody ProductsMeals productMeal, @RequestParam Long mealId){
        Meals meal = mealsService.getMealById(mealId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Meal not found"));
        productMeal.setMeals(meal);
        ProductsMeals createdProductMeal = productMealsService.createProductMeal(productMeal);
        return new ResponseEntity<>(createdProductMeal, HttpStatus.CREATED);
    }

}
