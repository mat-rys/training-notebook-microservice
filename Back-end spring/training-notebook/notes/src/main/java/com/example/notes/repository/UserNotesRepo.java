package com.example.notes.repository;

import com.example.notes.entitie.UserNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserNotesRepo extends JpaRepository<UserNotes,Long> {

    List<UserNotes> findByUserId(String userId);
}
