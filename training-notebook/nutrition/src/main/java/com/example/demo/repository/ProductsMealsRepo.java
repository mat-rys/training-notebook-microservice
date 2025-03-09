package com.example.demo.repository;

import com.example.demo.dto.ProductsMealsStatsDTO;
import com.example.demo.entitie.ProductsMeals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

@Repository
public interface ProductsMealsRepo extends JpaRepository<ProductsMeals, Long> {
    List<ProductsMeals> findAllByMeals_Id(Long mealId);
    void deleteByMeals_Id(BigInteger mealId);

    @Query("SELECT new com.example.demo.dto.ProductsMealsStatsDTO(p.title, COUNT(p.title)) " +
            "FROM Meals m JOIN m.productsMeals p " +
            "WHERE m.userId = :userId " +
            "AND m.day BETWEEN :startDate AND :endDate " +
            "GROUP BY p.title " +
            "ORDER BY COUNT(p.title) DESC")
    List<ProductsMealsStatsDTO> findMostFrequentMeals(@Param("userId") String userId,
                                                      @Param("startDate") Date startDate,
                                                      @Param("endDate") Date endDate);
}
