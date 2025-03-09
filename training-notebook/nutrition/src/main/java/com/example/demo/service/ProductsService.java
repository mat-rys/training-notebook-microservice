package com.example.demo.service;

import com.example.demo.entitie.Products;

import java.util.List;
import java.util.Optional;

public interface ProductsService {
    Products createProduct(Products product);

    Optional<Products> getProductById(Long id);

    Products updateProduct(Long id, Products product);
    List<Products> getAllProducts();

    void deleteProduct(Long id);
}
