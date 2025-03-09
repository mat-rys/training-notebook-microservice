package com.example.demo.service;

import com.example.demo.dto.CookingAdviceInformationDTO;
import com.example.demo.entitie.Products;
import org.springframework.stereotype.Service;


import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class CookingIdeaService {

    // Definicja regex do walidacji liczby w formacie np. "150", "30g"
    private static final Pattern NUMBER_PATTERN = Pattern.compile("^[0-9]+(g|G|kcal|Kcal)?$");

    public String buildMealIdeaMessage(CookingAdviceInformationDTO adviceInfo) {
        StringBuilder message = new StringBuilder("Na podstawie produktów użytkownika aplikacji żywieniowej: ");

        // Walidacja formatów danych wejściowych
        if (adviceInfo.getSelectedProducts() != null && !adviceInfo.getSelectedProducts().isEmpty()) {
            for (Products product : adviceInfo.getSelectedProducts()) {
                if (!isValidProductFormat(product)) {
                    return "Otrzymano nieprawidłowy format dla produktu: " + product.getTitle();
                }
            }
        }

        // Dodanie wybranych produktów
        message.append(Optional.ofNullable(adviceInfo.getSelectedProducts())
                .filter(products -> !products.isEmpty())
                .map(products -> products.stream()
                        .map(Products::getTitle)
                        .collect(Collectors.joining(", ")))
                .map(productList -> productList + ". ")
                .orElse("Brak wybranych produktów. "));

        // Dodanie komentarza
        message.append(Optional.ofNullable(adviceInfo.getComment())
                .filter(comment -> !comment.isEmpty())
                .map(comment -> "Dodatkowy komentarz użytkownika: " + comment + ". ")
                .orElse(""));

        // Dodanie preferencji
        message.append("Preferencje: ")
                .append(adviceInfo.isHealthy() ? "Zdrowy posiłek. " : "Możliwe mniej zdrowe składniki. ")
                .append("Pory posiłków: ")
                .append(String.join(", ", adviceInfo.getMealTimes()))
                .append(". ");

        // Dodanie informacji o dodatkowych produktach
        message.append(adviceInfo.isAllowAdditionalProducts() ?
                "Użytkownik pozwala na dodatkowe produkty nie będące przyprawami. " :
                "Użytkownik nie pozwala na dodatkowe produkty. ");

        appendNutritionalInfo(message, "Kaloryczność: ", adviceInfo.getCalories(), " kcal. ");
        appendNutritionalInfo(message, "Węglowodany: ", adviceInfo.getMinCarbs(), adviceInfo.getMaxCarbs(), "g");
        appendNutritionalInfo(message, "Białko: ", adviceInfo.getMinProtein(), adviceInfo.getMaxProtein(), "g");
        appendNutritionalInfo(message, "Tłuszcz: ", adviceInfo.getMinFat(), adviceInfo.getMaxFat(), "g");

        message.append("Na tej podstawie zaproponuj pomysł na posiłek przedstaw go jak przepis MAX 700 znaków. Musisz przedstawić to w taki sposób 1# nazwa dania posiłku  2# kalorie tłuszcze węglowodany i białka 3.Składniki i ich ilość gramy  4# przepis alfabetycznie");

        return message.toString();
    }

    private boolean isValidProductFormat(Products product) {
        // Walidacja formatu liczby w produkcie (np. kalorie, węglowodany, białko, tłuszcz)
        return isValidNumber(product.getCalories()) &&
                isValidNumber(product.getCarbs()) &&
                isValidNumber(product.getProtein()) &&
                isValidNumber(product.getFat());
    }


    private boolean isValidNumber(Number value) {
        if (value == null) {
            return false;
        }

        // Sprawdzamy, czy wartość jest typu Double, Integer lub Long i walidujemy
        if (value instanceof Double || value instanceof Integer || value instanceof Long) {
            return value.doubleValue() >= 0;  // Walidujemy, czy wartość jest dodatnia
        }

        // Jeśli to nie Double/Integer/Long, to traktujemy jako niepoprawny format
        return false;
    }


    private void appendNutritionalInfo(StringBuilder message, String label, Number min, Number max, String unit) {
        if (min != null || max != null) {
            message.append(label);
            if (min != null) {
                message.append("minimum ").append(min).append(unit).append(", ");
            }
            if (max != null) {
                message.append("maksimum ").append(max).append(unit).append(". ");
            }
        }
    }

    private void appendNutritionalInfo(StringBuilder message, String label, Number value, String unit) {
        if (value != null) {
            message.append(label).append(value).append(unit).append(" ");
        }
    }

}
