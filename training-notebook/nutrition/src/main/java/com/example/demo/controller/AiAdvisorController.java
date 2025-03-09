package com.example.demo.controller;

import com.example.demo.dto.AdviceDataDTO;
import com.example.demo.dto.CookingAdviceInformationDTO;
import com.example.demo.entitie.Meals;
import com.example.demo.entitie.Products;
import com.example.demo.entitie.ProductsMeals;
import com.example.demo.service.CookingIdeaService;
import com.example.demo.service.MealsService;
import com.example.demo.service.ProductMealsService;
import lombok.AllArgsConstructor;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/nutrition/ai")
@AllArgsConstructor
public class AiAdvisorController {

    private final OpenAiChatClient chatClient;
    private final ProductMealsService productMealsService;
    private final MealsService mealsService;
    private final CookingIdeaService cookingIdeaService;

    @GetMapping("/generate/products")
    public Map generateProducts(@RequestParam(value = "meal_id") Long mealId) {
        List<ProductsMeals> productMeals = productMealsService.getProductsForMeal(mealId);
        String productsList = productMeals.stream()
                .map(productMeal -> productMeal.toString())
                .collect(Collectors.joining(", "));
        String message = "Mam te produkty w posiłku: " + productsList + "." +
                ". Jeśli produkty są puste, zwróć informacje o potrzebie danych do wystawienia diagnozy." +
                "Wygeneruj 3 punkty." +
                " W punkcie 1. powiedz mi, czy posiłek razem jest zbilansowany." +
                " W punkcie 2. powiedz mi, co warto dodać do mojego posiłku albo usunąć zmienić, aby był zdrowszy, czego mu brakuje, ale proponuj produkty takie, które się wpasowują w informacje jakie masz o daniu pora, typ dania, itd.." +
                " W punkcie 3. powiedz mi, jakie są negatywne aspekty jedzenia tak na dłuższą metę. Jeśli nie ma takich, to pomiń." +
                " Bądź w każdym punkcie precyzyjny i staraj się pisać treściwie i krótko. max 1000 znaków, tylko punkty są liczbami z kropką nigdzie nie używaj kropki z liczbą po za punktami";

        return Map.of("generation", chatClient.call(message));
    }

//    @GetMapping("/generate/meals/{day}")
//    public Map generateMeals(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date day, Principal principal) {
//        List<Meals> meals = mealsService.getMealsByDayAndUserId(day, principal.getName());
//        String message = "Mam posiłki z produktami, " + meals +
//                ". Jeśli posiłki i produkty są puste, zwróć informacje o potrzebie danych do wystawienia diagnozy." +
//                " W punkcie 1. powiedz mi, czy posiłki razem jako cały dzień jedzenia takiego są zbilansowane lub nie." +
//                " W punkcie 2. powiedz mi, co warto dodać do moich posiłków albo z nich usunąć, zmniejszyć, aby były zdrowsze, czego im brakuje, ale proponuj produkty takie, które się wpasowują w typ dania kulinarnego." +
//                " W punkcie 3. powiedz mi, jakie są negatywne aspekty jedzenia tak na dłuższą metę. Jeśli nie ma takich, to pomiń." +
//                " Bądź w każdym punkcie precyzyjny i staraj się pisać krótko i treściwie. max 600 znaków, tylko punkty są liczbami z kropką nigdzie nie używaj kropki z liczbą po za punktami";
//
//        return Map.of("generation", chatClient.call(message));
//    }

    @GetMapping("/generate/statistics/ai")
    public Map<String, Object> generateAdviceAiAboutSendedStatistics(
            @RequestParam String statistics,
            @RequestParam String personalInformation,
            Principal principal) {
        String message = "Mam statystyki od użytkownika aplikacji żywieniowej: " + statistics +
                "A to są jego informacje personalne aktualnej sytuacji" + personalInformation+
                "Napisz krótko opinie odnośnie statystyka użytkownika i poradę odnośnie informacji jakie masz i celu użytkownika" +
                "Nie rozpisuj się o koslutacji z odpowiednimi osobami tylko zapewnij poradę samemu" +
                "max 350 znaków najlepiej.";
        System.out.println(message);
        return Map.of("generation", chatClient.call(message));
    }

    @PostMapping("/generate/cooking-idea")
    public ResponseEntity<Map<String, Object>> generateMealIdea(
            @RequestBody CookingAdviceInformationDTO adviceInfo) {

        // Walidacja danych wejściowych
        if ((adviceInfo.getSelectedProducts() == null || adviceInfo.getSelectedProducts().isEmpty()) &&
                (adviceInfo.getComment() == null || adviceInfo.getComment().isEmpty())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Musisz podać produkty lub komentarz, aby wygenerować poradę."));
        }

        // Budowanie wiadomości za pomocą serwisu
        String message = cookingIdeaService.buildMealIdeaMessage(adviceInfo);

        // Sprawdzamy, czy pojawił się błąd w formacie
        if (message.contains("Otrzymano nieprawidłowy format")) {
            return ResponseEntity.badRequest().body(Map.of("error", message));
        }

        // Wywołanie klienta AI z wiadomością
        String mealIdea = chatClient.call(message);
        System.out.println(message);

        // Zwrócenie odpowiedzi z wygenerowanym pomysłem na posiłek
        return ResponseEntity.ok(Map.of("mealIdea", mealIdea));
    }


    @GetMapping("/generate/meals/{day}")
    public Map generateMeals(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date day, Principal principal) {
        List<Meals> meals = mealsService.getMealsByDayAndUserId(day, principal.getName());
        String message = "użytkownika ma listę posiłków z produktami, " + meals +
                " W punkcie 1. zwróc wniosek, czy posiłki razem jako cały dzień jedzenia są zbilansowane" +
                " W punkcie 2. zwróc wniosek, co warto zmienić w posiłkach, aby były zdrowsze, proponuj produkty, które się wpasowują w typ dania kulinarnego." +
                " W punkcie 3. zwróc wniosek, jakie są negatywne aspekty przedstawionej żywności na dłuższy okres" +
                " Bądź w każdym punkcie precyzyjny i staraj się pisać krótko i treściwie. " +
                "max 800 znaków, tylko punkty są liczbami z kropką nigdzie nie używaj kropki z liczbą po za punktami";
        return Map.of("generation", chatClient.call(message));
    }

    // Example method to extract the token from Principal



//    @GetMapping("/generate")
//    public Map generate(@RequestParam(value = "message") String message) {
//
//        return Map.of("generation", chatClient.call(message));
//    }
}




