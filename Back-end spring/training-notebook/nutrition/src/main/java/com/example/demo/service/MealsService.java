package com.example.demo.service;

import com.example.demo.entitie.Meals;

import java.sql.Time;
import java.util.List;
import java.util.Date;
import java.util.Optional;

public interface MealsService {
    Meals createMeal(Meals meal);
    Optional<Meals> getMealById(Long id);
    List<Meals> getAllMeals();
    List<Meals> getMealsByDay(Date day);
    void deleteMeal(Long id);
    public List<Meals> getMealsByDayAndUserId(Date day, String userId);
    Meals updateMealData(Long id, Meals updatedData) ;
    Meals updateMealData(Long id, String title, Date day, Time mealTime);
    List<Date> getDistinctDaysByUserId(String userId);
}

