package com.example.notes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ActivityTypeCountDTO {

    private String activityType;
    private Integer count;
}
