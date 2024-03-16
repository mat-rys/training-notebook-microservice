package com.example.body.body.entitie;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString

@Entity
@EnableAutoConfiguration
@Table(name = "limits_profile")
public class LimitsProfile {

    public LimitsProfile(Integer limitCalories, Integer limitCarbs, Integer limitFats, Integer limitProteins) {
        this.limitCalories = limitCalories;
        this.limitCarbs = limitCarbs;
        this.limitFats = limitFats;
        this.limitProteins = limitProteins;
    }

    @Id
    @Column(name = "id_user")
    private String idUser;
    @Column(name = "limit_calories")
    private Integer limitCalories;
    @Column(name = "limit_carbs")
    private Integer limitCarbs;
    @Column(name = "limit_fats")
    private Integer limitFats;
    @Column(name = "limit_proteins")
    private Integer limitProteins;
}
