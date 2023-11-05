    package com.example.demo.entitie;

    import jakarta.persistence.*;
    import lombok.*;

    import java.sql.Time;
    import java.sql.Timestamp;
    import java.util.Date;
    import java.util.List;

    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Getter
    @Setter
    @ToString

    @Entity
    @Table(name = "meals")
    public class Meals {

        public Meals(Double calories, Double carbs, Double protein, Double fat, Date day, Time mealTime, String userId) {
            this.calories = calories;
            this.carbs = carbs;
            this.protein = protein;
            this.fat = fat;
            this.day = day;
            this.mealTime = mealTime;
            this.userId = userId;
        }

        public Meals(Double calories, Double carbs, Double protein, Double fat, Date day, Time mealTime) {
            this.calories = calories;
            this.carbs = carbs;
            this.protein = protein;
            this.fat = fat;
            this.day = day;
            this.mealTime = mealTime;
        }

        public Meals(String title, Date day, Time mealTime) {
            this.title = title;
            this.day = day;
            this.mealTime = mealTime;
        }

        public Meals(Double calories, Double carbs, Double protein, Double fat) {
            this.calories = calories;
            this.carbs = carbs;
            this.protein = protein;
            this.fat = fat;
        }

        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE)
        @Column(name = "meal_id")
        private Long id;
        private String title;

        private Double calories;
        private Double carbs;
        private Double protein;
        private Double fat;

        private Date day;
        private Time mealTime;

        private String userId;
    }
