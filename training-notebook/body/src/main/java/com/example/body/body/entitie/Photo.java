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
    @Column(name = "id_user")
    private String idUser;
    @Column(name = "photo_url")
    private String photoUrl;

}
