package com.example.notes.controller;

import com.example.notes.service.UserNotesServiceImlp;
import lombok.AllArgsConstructor;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/nutrition/ai")
@AllArgsConstructor
public class AiAdvisorController {

    private final OpenAiChatClient chatClient;
    private final UserNotesServiceImlp userNotesServiceImlp;

    @GetMapping("/generate/notes/{day}")
    public Map generateMeals(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fromDay,
                             @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date toDay,
                             Principal principal) {
//        List<Meals> meals = mealsService.getMealsByDayAndUserId(fromDay, toDay, principal.getName());
        String message = "Mam posiłki z produktami, ";

        return Map.of("generation", chatClient.call(message));
    }

}




