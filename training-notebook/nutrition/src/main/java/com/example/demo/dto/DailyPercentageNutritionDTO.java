package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class DailyPercentageNutritionDTO {
    private Date day;
    private Double calories;
    private Double procentFat;
    private Double procentCarbs;
    private Double procentProtein;
}
