package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entitie.Meals;
import com.example.demo.service.MealsServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/nutrition/meals")
@AllArgsConstructor
public class MealsController {
    private final MealsServiceImpl mealsServiceImpl;

    @GetMapping("/mealTimesStatistics")
    List<MealTimeDTO> getMealTimesByUserIdAndDateRange(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            Principal principal) {

        return mealsServiceImpl.getMealTimesByUserIdAndDateRange(principal.getName(), startDate, endDate);
    }

    @GetMapping("/percentageNutritionByDay")
    public List<DailyPercentageNutritionDTO> getPercentageNutritionByDay(Principal principal,
                                                  @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                                  @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return mealsServiceImpl.getMealsNutritionByDateRange(principal.getName(), startDate, endDate);
    }

    @GetMapping("/sumCalories")
    public List<CaloriesDTO> getSumCaloriesByUserIdAndDateRange(Principal principal,
                                                                @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date startDate,
                                                                @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date endDate) {
        return mealsServiceImpl.getSumCaloriesByUserIdAndDateRange(principal.getName(), startDate, endDate);
    }

    @GetMapping("/average")
    public List<AverageDTO> getAverageNutrients(Principal principal,
                                                @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                                @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return mealsServiceImpl.getAverageNutrients(principal.getName(), startDate, endDate);
    }

    @GetMapping("/id")
    public ResponseEntity<Meals> getMealById(@RequestBody Long id) {
        Optional<Meals> meal = mealsServiceImpl.getMealById(id);
        return meal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{day}/userId")
    public ResponseEntity<List<Meals>> getMealsByDayAndUserId(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date day, Principal principal) {
        List<Meals> meals = mealsServiceImpl.getMealsByDayAndUserId(day, principal.getName());
        return meals != null && !meals.isEmpty() ? new ResponseEntity<>(meals, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/day")
    public ResponseEntity<List<Meals>> getMealsByDay(@RequestBody Date day) {
        List<Meals> meals = mealsServiceImpl.getMealsByDay(day);
        return meals != null && !meals.isEmpty() ? new ResponseEntity<>(meals, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<Meals>> getAllMeals() {
        List<Meals> meals = mealsServiceImpl.getAllMeals();
        return meals != null && !meals.isEmpty() ? new ResponseEntity<>(meals, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/distinctDays")
    public List<String> getDistinctDaysByUserId(Principal principal) {
        return mealsServiceImpl.getDistinctDaysByUserId(principal.getName());
    }

    @PostMapping
    public ResponseEntity<Meals> createMeal(@RequestBody Meals meal, Principal principal) {
        meal.setUserId(principal.getName());
        Meals createdMeal = mealsServiceImpl.createMeal(meal);
        return new ResponseEntity<>(createdMeal, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        mealsServiceImpl.deleteMeal(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meals> updateMealData(@PathVariable Long id, @RequestBody Meals updatedData) {
        Meals updatedMeal = mealsServiceImpl.updateMealData(id, updatedData);
        return updatedMeal != null ? new ResponseEntity<>(updatedMeal, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("mealEdit/{id}")
    public ResponseEntity<Meals> updateMealData(@PathVariable Long id, @RequestBody UpdateMealDTO updateMealDTO) {
        String title = updateMealDTO.getTitle();
        Date day = updateMealDTO.getDay();
        Time mealTime = updateMealDTO.getMealTime();
        Meals updatedMeal = mealsServiceImpl.updateMealData(id, title, day, mealTime);
        return updatedMeal != null ? new ResponseEntity<>(updatedMeal, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
