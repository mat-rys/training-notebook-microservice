package com.example.demo.controller;

import lombok.AllArgsConstructor;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/nutrition/ai")
@AllArgsConstructor
public class AiAdvisorController {

    private final OpenAiChatClient chatClient;

    @GetMapping("/generate")
    public Map generate(@RequestParam(value = "message") String message) {
        return Map.of("generation", chatClient.call(message));
    }
}
