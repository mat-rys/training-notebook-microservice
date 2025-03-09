package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.util.Date;

@Getter
@Setter
public class UpdateMealDTO {
    private String title;
    private Date day;
    private Time mealTime;
}

