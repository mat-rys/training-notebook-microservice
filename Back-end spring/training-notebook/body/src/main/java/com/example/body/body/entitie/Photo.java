package com.example.body.body.entitie;

import jakarta.persistence.*;
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
@Table(name = "photo_profile")
public class Photo {

    public Photo(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private String idUser;
    @Column(name = "photourl")
    private String photoUrl;

}
