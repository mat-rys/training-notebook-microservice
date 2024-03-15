package com.example.demo.service;

import com.example.demo.dto.AverageDTO;
import com.example.demo.dto.CaloriesDTO;
import com.example.demo.entitie.Meals;
import com.example.demo.repository.MealsRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class MealsServiceImpl implements MealsService {

    private final MealsRepo mealsRepository;

    @Override
    public List<CaloriesDTO> getSumCaloriesByUserIdAndDateRange(String userId, Date startDate, Date endDate) {
        return mealsRepository.findSumCaloriesByUserIdAndDateRange(userId, startDate, endDate);
    }

    @Override
    public List<AverageDTO> getAverageNutrients(String userId, Date startDate, Date endDate) {
        return mealsRepository.findSumNutrientsByUserIdAndDateRange(userId, startDate, endDate);
    }
    @Override
    public Meals createMeal(Meals meal) {
        return mealsRepository.save(meal);
    }

    @Override
    public Optional<Meals> getMealById(Long id) {
        return Optional.ofNullable(mealsRepository.findById(id).orElse(null));
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
    public Meals updateMealData(Long id, String title, Date day, Time mealTime) {
        return mealsRepository.findById(id).map(existingMeal -> {
            Optional.ofNullable(title).ifPresent(existingMeal::setTitle);
            Optional.ofNullable(day).ifPresent(existingMeal::setDay);
            Optional.ofNullable(mealTime).ifPresent(existingMeal::setMealTime);
            return mealsRepository.save(existingMeal);
        }).orElse(null);
    }

    @Override
    public Meals updateMealData(Long id, Meals updatedData) {
        return mealsRepository.findById(id).map(existingMeal -> {
            Optional.ofNullable(updatedData.getTitle()).ifPresent(existingMeal::setTitle);
            Optional.ofNullable(updatedData.getCalories()).ifPresent(existingMeal::setCalories);
            Optional.ofNullable(updatedData.getCarbs()).ifPresent(existingMeal::setCarbs);
            Optional.ofNullable(updatedData.getProtein()).ifPresent(existingMeal::setProtein);
            Optional.ofNullable(updatedData.getFat()).ifPresent(existingMeal::setFat);
            Optional.ofNullable(updatedData.getDay()).ifPresent(existingMeal::setDay);
            Optional.ofNullable(updatedData.getMealTime()).ifPresent(existingMeal::setMealTime);
            return mealsRepository.save(existingMeal);
        }).orElse(null);
    }

    @Override
    public List<String> getDistinctDaysByUserId(String userId) {
        List<Date> dates = mealsRepository.findDistinctDaysByUserId(userId);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        List<String> formattedDates = new ArrayList<>();
        for (Date date : dates) {
            if (date != null) {
                formattedDates.add(formatter.format(date));
            }
        }
        return formattedDates;
    }

}
