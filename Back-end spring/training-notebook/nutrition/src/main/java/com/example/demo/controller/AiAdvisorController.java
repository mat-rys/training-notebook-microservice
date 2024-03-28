package com.example.demo.controller;

import com.example.demo.entitie.ProductsMeals;
import com.example.demo.service.ProductMealsService;
import lombok.AllArgsConstructor;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/nutrition/ai")
@AllArgsConstructor
public class AiAdvisorController {

    private final OpenAiChatClient chatClient;
    private final ProductMealsService productMealsService;


    @GetMapping("/generate")
    public Map generate(@RequestParam(value = "meal_id") Long mealId) {
        List<ProductsMeals> productMeals = productMealsService.getProductsForMeal(mealId);
        String productsList = productMeals.stream()
                .map(productMeal -> productMeal.toString())
                .collect(Collectors.joining(", "));
        String message = "I have these products in the meal, tell me if the meal is balanced, and if not, what would you add to it and why? " + productsList;
        return Map.of("generation", chatClient.call(message));
    }

//    @GetMapping("/generate")
//    public Map generate(@RequestParam(value = "message") String message) {
//
//        return Map.of("generation", chatClient.call(message));
//    }
}




