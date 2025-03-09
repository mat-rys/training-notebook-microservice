package com.example.demo.dto;

import com.example.demo.entitie.Products;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CookingAdviceInformationDTO {
    private List<Products> selectedProducts;
    private String comment;
    private boolean healthy;
    private List<String> mealTimes;
    private boolean allowAdditionalProducts;

    private Integer calories;
    private Integer minCarbs;
    private Integer maxCarbs;
    private Integer minProtein;
    private Integer maxProtein;
    private Integer minFat;
    private Integer maxFat;
    private List<String> mealTypes;

    public CookingAdviceInformationDTO() {}
}
