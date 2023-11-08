package com.example.demo.service;

import com.example.demo.entitie.Products;

import java.util.List;

public interface ProductsService {
    Products createProduct(Products product);

    Products getProductById(Long id);

    Products updateProduct(Long id, Products product);
    List<Products> getAllProducts();

    void deleteProduct(Long id);
}
