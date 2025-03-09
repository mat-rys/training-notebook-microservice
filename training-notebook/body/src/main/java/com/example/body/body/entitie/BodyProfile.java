package com.example.body.body.entitie;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString

@Entity
@EnableAutoConfiguration
@Table(name = "body_profile")
public class BodyProfile {

    @Id
    @Column(name = "id_user")
    private String idUser;
    private Double weight;
    private Double height;
    private String gender;
    private Integer age;
    private String goals;

    @OneToMany(mappedBy = "bodyProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<BodyMeasurement> measurements;

    public BodyProfile(Double weight, Double height, String gender, Integer age, String goals) {
        this.weight = weight;
        this.height = height;
        this.gender = gender;
        this.age = age;
        this.goals = goals;
    }

}


