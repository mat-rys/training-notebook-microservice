package com.example.demo.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class CaloriesDTO {
    private Date day;
    private Double calories;

}
