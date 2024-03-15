package com.example.demo.entitie;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString

@Entity
@Table(name = "products")
public class Products {
    public Products(String title, Double calories, Integer grams, Double carbs, Double protein, Double fat) {
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

}
