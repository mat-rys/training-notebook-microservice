package com.example.body.body.controller;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BodyProfileDTO {

    private String idUser;
    private Double weight;
    private Double height;
    private String gender;
    private Integer age;
    private String goals;
}
