package com.example.notes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DailyNoteCountDTO {
    private String date;
    private Integer count;
}
