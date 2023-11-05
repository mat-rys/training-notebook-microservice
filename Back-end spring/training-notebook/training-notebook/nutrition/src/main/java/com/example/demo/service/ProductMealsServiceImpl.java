package com.example.demo.service;

import com.example.demo.entitie.ProductsMeals;
import com.example.demo.repository.ProductsMealsRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ProductMealsServiceImpl implements ProductMealsService {
    private final ProductsMealsRepo productMealsRepository;

    @Override
    public ProductsMeals createProductMeal(ProductsMeals productMeal) {
        return productMealsRepository.save(productMeal);
    }

    @Override
    public ProductsMeals getProductMealById(Long id) {
        return productMealsRepository.findById(id).orElse(null);
    }

    @Override
    public List<ProductsMeals> getAllProductMeals() {
        return productMealsRepository.findAll();
    }

    @Override
    public void deleteProductMeal(Long id) {
        productMealsRepository.deleteById(id);
    }

    @Override
    public List<ProductsMeals> createProductMealsForMeal(List<ProductsMeals> productMeals) {
        return productMealsRepository.saveAll(productMeals);
    }

    @Override
    public List<ProductsMeals> getProductsForMeal(Long mealId) {
        return productMealsRepository.findAllByMealId(mealId);
    }


}
