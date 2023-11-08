    package com.example.demo.repository;

    import com.example.demo.entitie.Meals;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    import java.util.Date;
    import java.util.List;

    @Repository
    public interface MealsRepo extends JpaRepository<Meals, Long> {
        List<Meals> findByDay(Date day);
        List<Meals> findByDayAndUserId(Date day, String userId);
    }

