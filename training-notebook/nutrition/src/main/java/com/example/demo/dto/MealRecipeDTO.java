package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class MealRecipeDTO {
    private String title;
    private String day; // użyj String zamiast Date
    private String mealTime;
    private String mealAdviceInfo;
}
