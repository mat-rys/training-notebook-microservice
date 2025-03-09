package com.example.notes.repository;

import com.example.notes.dto.DailyNoteCountDTO;
import com.example.notes.entitie.UserNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface UserNotesRepo extends JpaRepository<UserNotes,Long> {

    List<UserNotes> findByUserId(String userId);

    @Query("SELECT DISTINCT TO_CHAR(u.startDate, 'YYYY-MM-DD') " +
            "FROM UserNotes u WHERE u.userId = :userId")
    List<String> findAllDistinctStartDatesByUserId(String userId);

    @Query("SELECT u.activityType, COUNT(u) FROM UserNotes u WHERE u.userId = :userId " +
            "AND u.startDate BETWEEN :fromTimestamp AND :toTimestamp GROUP BY u.activityType")
    List<Object[]> findActivityTypeCountsByUserIdAndDateRange(@Param("userId") String userId,
                                                              @Param("fromTimestamp") Timestamp fromTimestamp,
                                                              @Param("toTimestamp") Timestamp toTimestamp);

    @Query("SELECT FUNCTION('TO_CHAR', u.startDate, 'Day') AS dayOfWeek, u.activityType, COUNT(u) AS count " +
            "FROM UserNotes u WHERE u.userId = :userId " +
            "AND u.startDate BETWEEN :fromTimestamp AND :toTimestamp " +
            "GROUP BY FUNCTION('TO_CHAR', u.startDate, 'Day'), u.activityType " +
            "ORDER BY dayOfWeek, u.activityType")
    List<Object[]> findActivityCountByUserIdAndWeekday(@Param("userId") String userId,
                                                       @Param("fromTimestamp") Timestamp fromTimestamp,
                                                       @Param("toTimestamp") Timestamp toTimestamp);

    @Query("SELECT new com.example.notes.dto.DailyNoteCountDTO(TO_CHAR(u.startDate, 'YYYY-MM-DD'), CAST(COUNT(u) AS integer)) " +
            "FROM UserNotes u WHERE u.userId = :userId " +
            "AND u.startDate BETWEEN :fromTimestamp AND :toTimestamp " +
            "GROUP BY TO_CHAR(u.startDate, 'YYYY-MM-DD')")
    List<DailyNoteCountDTO> findDailyNoteCountsByUserIdAndDateRange(
            @Param("userId") String userId,
            @Param("fromTimestamp") Timestamp fromTimestamp,
            @Param("toTimestamp") Timestamp toTimestamp);
}

