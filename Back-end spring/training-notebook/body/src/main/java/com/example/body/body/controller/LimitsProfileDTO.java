package com.example.body.body.controller;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LimitsProfileDTO  {

    private String idUser;
    private Integer limitCalories;
    private Integer limitCarbs;
    private Integer limitFats;
    private Integer limitProteins;
}
