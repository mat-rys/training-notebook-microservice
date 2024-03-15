package com.example.demo.service;

import com.example.demo.dto.AverageDTO;
import com.example.demo.dto.CaloriesDTO;
import com.example.demo.entitie.Meals;

import java.sql.Time;
import java.util.List;
import java.util.Date;
import java.util.Optional;

public interface MealsService {
    List<CaloriesDTO> getSumCaloriesByUserIdAndDateRange(String userId, Date startDate, Date endDate);
    List<AverageDTO> getAverageNutrients(String userId, Date startDate, Date endDate);
    Meals createMeal(Meals meal);
    Optional<Meals> getMealById(Long id);
    List<Meals> getAllMeals();
    List<Meals> getMealsByDay(Date day);
    void deleteMeal(Long id);
    public List<Meals> getMealsByDayAndUserId(Date day, String userId);
    Meals updateMealData(Long id, Meals updatedData) ;
    Meals updateMealData(Long id, String title, Date day, Time mealTime);
    List<String> getDistinctDaysByUserId(String userId);
}

