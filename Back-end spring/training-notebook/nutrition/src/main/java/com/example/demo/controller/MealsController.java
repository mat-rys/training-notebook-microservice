package com.example.demo.controller;

import com.example.demo.entitie.Meals;
import com.example.demo.service.MealsService;
import com.example.demo.service.ProductMealsService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/nutrition/meals")
@AllArgsConstructor
public class MealsController {
    private final MealsService mealsService;

    @PostMapping
    public Meals createMeal(@RequestBody Meals meal, Principal principal) {
        meal.setUserId(principal.getName());
        return mealsService.createMeal(meal);
    }

    @GetMapping("/id")
    public Meals getMealById(@RequestBody Long id) {
        return mealsService.getMealById(id);
    }

    @GetMapping("/{day}/userId")
    public List<Meals> getMealsByDayAndUserId(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date day, Principal principal) {
        return mealsService.getMealsByDayAndUserId(day, principal.getName());
    }

    @GetMapping("/day")
    public List<Meals> getMealsByDay(@RequestBody Date day) {
        return mealsService.getMealsByDay(day);
    }

    @GetMapping
    public List<Meals> getAllMeals() {
        return mealsService.getAllMeals();
    }

    @DeleteMapping("/{id}")
    public void deleteMeal(@PathVariable Long id) {
        mealsService.deleteMeal(id);
    }

    @PutMapping("/{id}")
    public Meals updateMealData(@PathVariable Long id, @RequestBody Meals updatedData) {
        return mealsService.updateMealData(id, updatedData);
    }

    @PutMapping("mealEdit/{id}")
    public Meals updateMealData(@PathVariable Long id, @RequestBody UpdateMealDTO updateMealDTO) {
        String title = updateMealDTO.getTitle();
        Date day = updateMealDTO.getDay();
        Time mealTime = updateMealDTO.getMealTime();
        return mealsService.updateMealData(id, title, day, mealTime);
    }


}
