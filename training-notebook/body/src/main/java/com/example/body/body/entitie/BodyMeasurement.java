package com.example.body.body.entitie;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString

@Entity
@Table(name = "body_measurement")
public class BodyMeasurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    @JsonBackReference
    private BodyProfile bodyProfile;

    @Column(name = "waist_circumference")
    private Double waistCircumference;

    @Column(name = "bicep_circumference")
    private Double bicepCircumference;

    @Column(name = "chest_circumference")
    private Double chestCircumference;

    @Column(name = "thigh_circumference")
    private Double thighCircumference;

    @Column(name = "hip_circumference")
    private Double hipCircumference;

    @Column(name = "forearm_circumference")
    private Double forearmCircumference;

    @Column(name = "calf_circumference")
    private Double calfCircumference;

    @Column(name = "neck_circumference")
    private Double neckCircumference;

    @Column(name = "wrist_circumference")
    private Double wristCircumference;

    @Column(name = "shoulder_circumference")
    private Double shoulderCircumference;

    @Column(name = "date_measured")
    private LocalDateTime dateMeasured;
}

