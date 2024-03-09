package com.example.notes.repository;

import com.example.notes.entitie.UserNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserNotesRepo extends JpaRepository<UserNotes,Long> {

    List<UserNotes> findByUserId(String userId);
    List<UserNotes> findByUserIdAndStartDateLike(String userId, String startDate);
    @Query("SELECT DISTINCT EXTRACT(DAY FROM u.startDate) FROM UserNotes u WHERE u.userId = :userId AND SUBSTRING(TO_CHAR(u.startDate, 'YYYY-MM'), 1, 7) = :yearMonth")
    List<Integer> findDistinctDayByUserIdAndYearMonth(String userId, String yearMonth);
}
