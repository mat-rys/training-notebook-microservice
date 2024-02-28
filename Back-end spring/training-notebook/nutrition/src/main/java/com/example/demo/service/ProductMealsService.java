package com.example.demo.service;

import com.example.demo.entitie.Meals;
import com.example.demo.entitie.ProductsMeals;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;

public interface ProductMealsService {

    ProductsMeals createProductMeal(ProductsMeals productMeal);

    ProductsMeals getProductMealById(Long id);

    List<ProductsMeals> getAllProductMeals();

    void deleteProductMeal(Long id);

    List<ProductsMeals> createProductMealsForMeal(List<ProductsMeals> productMeals);

    List<ProductsMeals> getProductsForMeal(Long mealId);

    void deleteProductsByMealId(BigInteger mealId);
}
