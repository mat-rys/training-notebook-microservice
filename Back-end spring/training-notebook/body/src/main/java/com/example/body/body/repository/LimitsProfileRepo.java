package com.example.body.body.repository;

import com.example.body.body.entitie.LimitsProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LimitsProfileRepo extends JpaRepository<LimitsProfile,String> {
}
