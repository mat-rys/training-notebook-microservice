package com.example.demo.controller;

import com.example.demo.entitie.ProductsMeals;
import com.example.demo.service.ProductMealsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/nutrition/products-meals")
public class ProductMealsController {

    private final ProductMealsService productMealsService;

    @PostMapping
    public ProductsMeals createProductMeal(@RequestBody ProductsMeals productMeal) {
        return productMealsService.createProductMeal(productMeal);
    }

    @GetMapping("/{id}")
    public ProductsMeals getProductMealById(@PathVariable Long id) {
        return productMealsService.getProductMealById(id);
    }

    @GetMapping
    public List<ProductsMeals> getAllProductMeals() {
        return productMealsService.getAllProductMeals();
    }

    @DeleteMapping("/{id}")
    public void deleteProductMeal(@PathVariable Long id) {
        productMealsService.deleteProductMeal(id);
    }

    @PostMapping("/create-for-meal")
    public List<ProductsMeals> createProductMealsForMeal(@RequestBody List<ProductsMeals> productMeals) {
        return productMealsService.createProductMealsForMeal(productMeals);
    }

    @GetMapping("/get-for-meal/{mealId}")
    public List<ProductsMeals> getProductsForMeal(@PathVariable Long mealId) {
        return productMealsService.getProductsForMeal(mealId);
    }
}
