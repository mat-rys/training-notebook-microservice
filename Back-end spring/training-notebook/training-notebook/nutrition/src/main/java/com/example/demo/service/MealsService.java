package com.example.demo.service;

import com.example.demo.entitie.Meals;

import java.sql.Timestamp;
import java.util.List;
import java.util.Date;

public interface MealsService {
    Meals createMeal(Meals meal);
    Meals getMealById(Long id);
    List<Meals> getAllMeals();
    List<Meals> getMealsByDay(Date day); // Dodaj nową metodę
    void deleteMeal(Long id);
    public List<Meals> getMealsByDayAndUserId(Date day, String userId);
    Meals updateMealData(Long id, Meals updatedData) ;
}

