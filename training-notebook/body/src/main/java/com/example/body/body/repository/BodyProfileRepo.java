package com.example.body.body.repository;

import com.example.body.body.entitie.BodyProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BodyProfileRepo extends JpaRepository<BodyProfile,String>{
    BodyProfile findByIdUser(String idUser);
}
