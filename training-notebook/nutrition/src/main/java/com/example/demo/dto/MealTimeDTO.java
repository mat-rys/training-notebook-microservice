package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MealTimeDTO {
    private Long morningMeals;
    private Long afternoonMeals;
    private Long eveningMeals;
    private Long nightMeals;
}