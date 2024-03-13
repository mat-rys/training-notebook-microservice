    package com.example.demo.repository;

    import com.example.demo.controller.AverageDTO;
    import com.example.demo.controller.CaloriesDTO;
    import com.example.demo.entitie.Meals;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Query;
    import org.springframework.data.repository.query.Param;
    import org.springframework.stereotype.Repository;

    import java.util.Date;
    import java.util.List;
    import java.util.Map;

    @Repository
    public interface MealsRepo extends JpaRepository<Meals, Long> {
        List<Meals> findByDay(Date day);
        List<Meals> findByDayAndUserId(Date day, String userId);
        @Query("SELECT DISTINCT m.day FROM Meals m WHERE m.userId = :userId")
        List<Date> findDistinctDaysByUserId(@Param("userId") String userId);

        @Query("SELECT new com.example.demo.controller.AverageDTO(m.day, ROUND(SUM(m.fat), 2), ROUND(SUM(m.carbs), 2), ROUND(SUM(m.protein), 2)) " +
                "FROM Meals m " +
                "WHERE m.userId = :userId " +
                "AND m.day BETWEEN :startDate AND :endDate " +
                "GROUP BY m.day " +
                "ORDER BY m.day")
        List<AverageDTO> findSumNutrientsByUserIdAndDateRange(@Param("userId") String userId, @Param("startDate") Date startDate, @Param("endDate") Date endDate);

        @Query("SELECT new com.example.demo.controller.CaloriesDTO(m.day, ROUND(SUM(m.calories), 2)) " +
                "FROM Meals m " +
                "WHERE m.userId = :userId " +
                "AND m.day BETWEEN :startDate AND :endDate " +
                "GROUP BY m.day " +
                "ORDER BY m.day")
        List<CaloriesDTO> findSumCaloriesByUserIdAndDateRange(@Param("userId") String userId, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
    }

