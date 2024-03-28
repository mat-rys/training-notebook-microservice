package com.example.body.body.repository;

import com.example.body.body.entitie.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepo extends JpaRepository<Photo,String> {
    Photo findByIdUser(String idUser);
}

