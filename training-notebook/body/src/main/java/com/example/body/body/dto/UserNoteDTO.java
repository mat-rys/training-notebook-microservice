package com.example.body.body.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserNoteDTO {
    private Long id;
    private String title;
    private String activityType;
    private Timestamp startDate;
    private Timestamp endDate;
    private String description;
    private String userId; // Z keycloak id
}