package com.example.demo.controller;

import com.example.demo.entitie.Meals;
import com.example.demo.service.MealsService;
import com.example.demo.service.ProductMealsService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/nutrition/meals")
@AllArgsConstructor
public class MealsController {
    private final MealsService mealsService;

    @GetMapping("/sumCalories")
    public List<CaloriesDTO> getSumCaloriesByUserIdAndDateRange(Principal principal,
                                                                @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date startDate,
                                                                @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date endDate) {
        return mealsService.getSumCaloriesByUserIdAndDateRange(principal.getName(), startDate, endDate);
    }


    @GetMapping("/average")
    public List<AverageDTO> getAverageNutrients(Principal principal,
                                                @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                                @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return mealsService.getAverageNutrients(principal.getName(), startDate, endDate);
    }

    @GetMapping("/id")
    public ResponseEntity<Meals> getMealById(@RequestBody Long id) {
        Optional<Meals> meal = mealsService.getMealById(id);
        return meal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{day}/userId")
    public ResponseEntity<List<Meals>> getMealsByDayAndUserId(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date day, Principal principal) {
        List<Meals> meals = mealsService.getMealsByDayAndUserId(day, principal.getName());
        return meals != null && !meals.isEmpty() ? new ResponseEntity<>(meals, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/day")
    public ResponseEntity<List<Meals>> getMealsByDay(@RequestBody Date day) {
        List<Meals> meals = mealsService.getMealsByDay(day);
        return meals != null && !meals.isEmpty() ? new ResponseEntity<>(meals, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<Meals>> getAllMeals() {
        List<Meals> meals = mealsService.getAllMeals();
        return meals != null && !meals.isEmpty() ? new ResponseEntity<>(meals, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/distinctDays")
    public List<String> getDistinctDaysByUserId(Principal principal) {
        return mealsService.getDistinctDaysByUserId(principal.getName());
    }

    @PostMapping
    public ResponseEntity<Meals> createMeal(@RequestBody Meals meal, Principal principal) {
        meal.setUserId(principal.getName());
        Meals createdMeal = mealsService.createMeal(meal);
        return new ResponseEntity<>(createdMeal, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        mealsService.deleteMeal(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meals> updateMealData(@PathVariable Long id, @RequestBody Meals updatedData) {
        Meals updatedMeal = mealsService.updateMealData(id, updatedData);
        return updatedMeal != null ? new ResponseEntity<>(updatedMeal, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("mealEdit/{id}")
    public ResponseEntity<Meals> updateMealData(@PathVariable Long id, @RequestBody UpdateMealDTO updateMealDTO) {
        String title = updateMealDTO.getTitle();
        Date day = updateMealDTO.getDay();
        Time mealTime = updateMealDTO.getMealTime();
        Meals updatedMeal = mealsService.updateMealData(id, title, day, mealTime);
        return updatedMeal != null ? new ResponseEntity<>(updatedMeal, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
