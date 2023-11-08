package com.example.demo.service;

import com.example.demo.entitie.Meals;
import com.example.demo.repository.MealsRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Service
public class MealsServiceImpl implements MealsService {

    private final MealsRepo mealsRepository;

    @Override
    public Meals createMeal(Meals meal) {
        return mealsRepository.save(meal);
    }

    @Override
    public Meals getMealById(Long id) {
        return mealsRepository.findById(id).orElse(null);
    }

    @Override
    public List<Meals> getAllMeals() {
        return mealsRepository.findAll();
    }

    @Override
    public List<Meals> getMealsByDay(Date day) {
        return mealsRepository.findByDay(day);
    }

    @Override
    public void deleteMeal(Long id) {
        mealsRepository.deleteById(id);
    }

    @Override
        public List<Meals> getMealsByDayAndUserId(Date day, String userId) {
        return mealsRepository.findByDayAndUserId(day, userId);
    }

    @Override
    public Meals updateMealData(Long id, Meals updatedData) {
        Meals existingMeal = mealsRepository.findById(id).orElse(null);

        if (existingMeal != null) {
            if (updatedData.getTitle() != null) {
                existingMeal.setTitle(updatedData.getTitle());
            }
            if (updatedData.getCalories() != null) {
                existingMeal.setCalories(updatedData.getCalories());
            }
            if (updatedData.getCarbs() != null) {
                existingMeal.setCarbs(updatedData.getCarbs());
            }
            if (updatedData.getProtein() != null) {
                existingMeal.setProtein(updatedData.getProtein());
            }
            if (updatedData.getFat() != null) {
                existingMeal.setFat(updatedData.getFat());
            }
            if (updatedData.getDay() != null) {
                existingMeal.setDay(updatedData.getDay());
            }
            if (updatedData.getMealTime() != null) {
                existingMeal.setMealTime(updatedData.getMealTime());
            }

            return mealsRepository.save(existingMeal);
        }

        return null; // Zwróć null, jeśli posiłek o podanym id nie istnieje
    }
}
