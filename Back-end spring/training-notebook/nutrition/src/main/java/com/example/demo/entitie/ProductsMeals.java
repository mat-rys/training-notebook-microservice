package com.example.demo.entitie;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigInteger;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString

@Entity
@Table(name = "products_meal")
public class ProductsMeals {


    public ProductsMeals(String title, Double calories, Integer grams, Double carbs, Double protein, Double fat) {
        this.title = title;
        this.calories = calories;
        this.grams = grams;
        this.carbs = carbs;
        this.protein = protein;
        this.fat = fat;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)

    @Column(name = "product_id")
    private Long id;
    private String title;
    private Double calories;
    private Integer grams;
    private Double carbs;
    private Double protein;
    private Double fat;
    @ManyToOne
    @JoinColumn(name = "meal_id")
    @JsonBackReference
    private Meals meals;

    @Override
    public String toString() {
        return "ProductsMeals { " +
                "id: " + id +
                ", title: '" + title + '\'' +
                ", calories: " + calories +
                ", grams: " + grams +
                ", carbs: " + carbs +
                ", protein: " + protein +
                ", fat: " + fat +
                " }";
    }


}
