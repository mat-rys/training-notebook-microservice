package com.example.demo.service;

import com.example.demo.dto.ProductsMealsStatsDTO;
import com.example.demo.entitie.ProductsMeals;
import com.example.demo.repository.ProductsMealsRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ProductMealsServiceImpl implements ProductMealsService {
    private final ProductsMealsRepo productMealsRepository;

    @Override
    public List<ProductsMealsStatsDTO> getProductsStatsForUser(String userId, Date startDate, Date endDate) {
        return productMealsRepository.findMostFrequentMeals(userId, startDate, endDate);
    }

    @Override
    public ProductsMeals createProductMeal(ProductsMeals productMeal) {
        return productMealsRepository.save(productMeal);
    }

    @Override
    public Optional<ProductsMeals> getProductMealById(Long id) {
        return Optional.ofNullable(productMealsRepository.findById(id).orElse(null));
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
        return productMealsRepository.findAllByMeals_Id(mealId);
    }

    @Override
    @Transactional
    public void deleteProductsByMealId(BigInteger mealId) {
        productMealsRepository.deleteByMeals_Id(mealId);
    }


}
