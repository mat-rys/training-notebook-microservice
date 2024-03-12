package com.example.demo.service;

import com.example.demo.controller.ProductsMealsStatsDTO;
import com.example.demo.entitie.ProductsMeals;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ProductMealsService {

    List<ProductsMealsStatsDTO>  getProductsStatsForUser(String userId, Date startDate, Date endDate) ;
    ProductsMeals createProductMeal(ProductsMeals productMeal);

    Optional<ProductsMeals> getProductMealById(Long id);

    List<ProductsMeals> getAllProductMeals();

    void deleteProductMeal(Long id);

    List<ProductsMeals> createProductMealsForMeal(List<ProductsMeals> productMeals);

    List<ProductsMeals> getProductsForMeal(Long mealId);

    void deleteProductsByMealId(BigInteger mealId);
}
