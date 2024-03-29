package com.example.demo.controller;

import com.example.demo.entitie.Meals;
import com.example.demo.entitie.ProductsMeals;
import com.example.demo.service.MealsService;
import com.example.demo.service.ProductMealsService;
import lombok.AllArgsConstructor;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
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
    private final MealsService mealsService;


    @GetMapping("/generate/products")
    public Map generateProducts(@RequestParam(value = "meal_id") Long mealId) {
        List<ProductsMeals> productMeals = productMealsService.getProductsForMeal(mealId);
        String productsList = productMeals.stream()
                .map(productMeal -> productMeal.toString())
                .collect(Collectors.joining(", "));
        String message = "I have these products in the meal, " +
                "in point 1. tell me if the meal is balanced   " +
                "in point 2. tell me what would be good in my meal to add to be it healthier with that it lacks and propose some idea to go father with meal" +
                "in point 3. tell me negatives going with eating meals like that for example to much of something if not than skip " +
                " " + productsList;
        return Map.of("generation", chatClient.call(message));
    }

    @GetMapping("/generate/meals/{day}")
    public Map generateMeals(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date day, Principal principal) {
        List<Meals> meals = mealsService.getMealsByDayAndUserId(day, principal.getName());
        String message = "I have meals with products , " +
                "in point 1. tell me if the meals together are balanced   " +
                "in point 2. tell me what would be good in my meals to add to be it healthier with that it lacks and propose some idea to go father with meals" +
                "in point 3. tell me negatives going with eating meals like that for example to much of something if not than skip " +
                " " + meals;
        return Map.of("generation", chatClient.call(message));
    }

//    @GetMapping("/generate")
//    public Map generate(@RequestParam(value = "message") String message) {
//
//        return Map.of("generation", chatClient.call(message));
//    }
}




