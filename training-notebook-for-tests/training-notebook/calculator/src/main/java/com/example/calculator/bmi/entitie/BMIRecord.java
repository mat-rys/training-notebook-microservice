package com.example.calculator.bmi.entitie;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString

@Entity
@EnableAutoConfiguration
@Table(name = "bmi_records")
public class BMIRecord {

    public BMIRecord(double height, double weight, double bmiValue, String bmiCategory, String userId) {
        this.height = height;
        this.weight = weight;
        this.bmiValue = bmiValue;
        this.bmiCategory = bmiCategory;
        this.userId = userId;
    }

    public BMIRecord(double height, double weight, String userId) {
        this.height = height;
        this.weight = weight;
        this.userId = userId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bmi_id")
    private Long id;

    @Column(name = "height")
    private double height;

    @Column(name = "weight")
    private double weight;

    @Column(name = "bmi_value")
    private double bmiValue;

    @Column(name = "bmi_category")
    private String bmiCategory;

    @Column(name = "user_id") //Z keycloak id
    private String userId;
}
