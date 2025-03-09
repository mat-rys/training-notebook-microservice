    package com.example.demo.repository;

    import com.example.demo.entitie.Products;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    @Repository
    public interface ProductsRepo  extends JpaRepository<Products, Long> {

    }
