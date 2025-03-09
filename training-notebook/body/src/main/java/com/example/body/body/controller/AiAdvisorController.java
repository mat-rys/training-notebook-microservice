package com.example.body.body.controller;

import com.example.body.body.entitie.BodyProfile;
import com.example.body.body.service.BodyProfileServiceImlp;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/body/ai")
@AllArgsConstructor
@Slf4j
public class AiAdvisorController {

    private final OpenAiChatClient chatClient;
    private final BodyProfileServiceImlp bodyProfileServiceImpl;

    @GetMapping("/generate/bodyInformation")
    public Map generateBodyInformationAiAdvice(Principal principal) {
        Optional<BodyProfile> bodyInformation = bodyProfileServiceImpl.getBodyProfileById(principal.getName());

        // Tworzenie wiadomości z danymi osoby
        String message = "Mam następujące informacje o osobie: " +
                "Waga: " + bodyInformation.map(BodyProfile::getWeight).orElse(null) + " kg, " +
                "Wzrost: " + bodyInformation.map(BodyProfile::getHeight).orElse(null) + " cm, " +
                "Płeć: " + bodyInformation.map(BodyProfile::getGender).orElse(null) + ", " +
                "Wiek: " + bodyInformation.map(BodyProfile::getAge).orElse(null) + " lat, " +
                "Cele: " + bodyInformation.map(BodyProfile::getGoals).orElse("brak celów") + "." +
                "Na podstawie tych danych wygeneruj szczegółowe, ale zwięzłe porady w punktach liczbowych np.1., po za punktami nie używaj liczb z kropkami, " +
                "porady mają być dostosowane do osoby i celu ale nie wiedzą ogólnym tylko szczegółowo pod cel jak go osiągnąć z tym co ma user" +
                "staraj się zmieścić w okolicach 500 znaków";

        return Map.of("generation", chatClient.call(message));
    }
}






