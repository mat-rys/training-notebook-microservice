package com.example.notes.entitie;


import jakarta.persistence.*;

import jakarta.validation.constraints.Size;
import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString

@Entity
@Table(name = "userNotes")
public class UserNotes {
    public UserNotes(String title, String activityType, Timestamp startDate, Timestamp endDate, String description, String userId) {
        this.title = title;
        this.activityType = activityType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.userId = userId;
    }

    public UserNotes(String title, String activityType, Timestamp startDate, Timestamp endDate, String description) {
        this.title = title;
        this.activityType = activityType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }

    public UserNotes(Long id, String title, Timestamp startDate, Timestamp endDate, String description, String userId) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.userId = userId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)

    @Column(name = "note_id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "activity_type")
    private String activityType;

    @Column(name = "start_date")
    private Timestamp startDate;

    @Column(name = "end_date")
    private Timestamp endDate;

    @Column(name = "description")
    private String description;

    @Column(name = "user_id") //Z keycloak id
    private String userId;

}
