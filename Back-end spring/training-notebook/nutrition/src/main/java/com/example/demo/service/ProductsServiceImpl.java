package com.example.demo.service;

import com.example.demo.entitie.Products;
import com.example.demo.repository.ProductsRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ProductsServiceImpl implements ProductsService{
    private final ProductsRepo productsRepository;

    @Override
    public Products createProduct(Products product) {
        return productsRepository.save(product);
    }

    @Override
    public Products getProductById(Long id) {
        return productsRepository.findById(id).orElse(null);
    }

    @Override
    public List<Products> getAllProducts() {
        return productsRepository.findAll();
    }

    @Override
    public void deleteProduct(Long id) {
        productsRepository.deleteById(id);
    }

    @Override
    public Products updateProduct(Long id, Products product) {
        Products existingProduct = productsRepository.findById(id).orElse(null);
        if (existingProduct == null) {
            return null;
        }
        existingProduct.setTitle(product.getTitle());
        existingProduct.setCalories(product.getCalories());
        existingProduct.setGrams(product.getGrams());
        existingProduct.setCarbs(product.getCarbs());
        existingProduct.setProtein(product.getProtein());
        existingProduct.setFat(product.getFat());

        return productsRepository.save(existingProduct);
    }
}
