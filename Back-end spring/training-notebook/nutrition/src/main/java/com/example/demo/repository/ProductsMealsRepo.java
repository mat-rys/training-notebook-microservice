package com.example.demo.repository;

import com.example.demo.entitie.ProductsMeals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsMealsRepo extends JpaRepository<ProductsMeals, Long> {
    List<ProductsMeals> findAllByMealId(Long mealId);
}
