package com.example.demo.controller;

import com.example.demo.entitie.Products;
import com.example.demo.service.ProductsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/nutrition/products")
@AllArgsConstructor
public class ProductsController {

    private final ProductsService productsService;

    @PutMapping("/{id}")
    public Products updateProduct(@PathVariable Long id, @RequestBody Products product) {
        return productsService.updateProduct(id, product);
    }

    @PostMapping
    public Products createProduct(@RequestBody Products product) {
        return productsService.createProduct(product);
    }

    @GetMapping("/{id}")
    public Products getProductById(@PathVariable Long id) {
        return productsService.getProductById(id);
    }

    @GetMapping
    public List<Products> getAllProducts() {
        return productsService.getAllProducts();
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productsService.deleteProduct(id);
    }


}

