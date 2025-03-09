package com.example.notes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class ActivityCountDTO {
    private String dayOfWeek;
    private Map<String, Integer> activities;
}
