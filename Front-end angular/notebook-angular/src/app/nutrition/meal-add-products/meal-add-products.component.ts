import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductMeal } from './models/product-meal.model';
import { Meals } from './models/meals.model';
import { AuthService } from '../../security-config/auth.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MealsProductsService } from '../services/meals-products.service'; // Importuj serwis

@Component({
  selector: 'app-meal-add-products',
  templateUrl: './meal-add-products.component.html',
  styleUrls: ['./meal-add-products.component.css']
})
export class MealAddProductsComponent implements OnInit {
  searchQuery: string = ''; 
  products: Product[] = [];
  filteredProducts: Product[] = []; 
  
  addedProducts: Product[] = []; 
  totalCalories: number = 0;
  totalFat: number = 0;
  totalProtein: number = 0;
  totalCarbs: number = 0;

  idMeal!: number;

  selectedProducts: Product[] = []; 
  isEditingGrams: boolean = false;
  selectedProduct: Product | null = null;
  selectedProductGrams: number = 100; 
  token = this.authService.getToken();

  constructor(private authService: AuthService, private http: HttpClient, 
    private route: ActivatedRoute,  private router: Router, private mealsProductsService: MealsProductsService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idMeal = params['mealId'];
      this.loadProductsForMeal(this.idMeal); 
    });
    this.loadProducts();
  }

  handleLogout() {
    this.authService.removeToken();
  }

  
  loadProducts() {
    this.mealsProductsService.loadProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(product: Product) {
    this.mealsProductsService.deleteProduct(product.id).subscribe(() => {
      this.loadProducts();
    }, error => {
      console.error('Błąd podczas usuwania notatki:', error);
    });
  }

  updateProduct(editingProduct: Product) {
    if (editingProduct) {
      this.mealsProductsService.updateProduct(editingProduct).subscribe(response => {
        this.loadProducts();
      }, error => {
        console.error('Error updating product:', error);
      });
    }
  }

  loadProductsForMeal(mealId: number) {
    this.mealsProductsService.loadProductsForMeal(mealId).subscribe((data) => {
      this.selectedProducts = data;
    });
  }

  updateMealTotals(updatedTotals: Meals) {
    this.mealsProductsService.updateMealTotals(this.idMeal, updatedTotals).subscribe(
      (response) => {console.log('Meal totals updated:', response);},
      (error) => {console.error('Error updating meal totals:', error);}
    ); 
  }

  addSelectedProductToMeal(product: Product) {
    const gramsToAdd = prompt(`Enter grams for ${product.title}:`, '100');
    if (gramsToAdd !== null) {
      const grams = parseInt(gramsToAdd);
      if (!isNaN(grams) && grams > 0) {
        this.mealsProductsService.addSelectedProductToMeal(product, this.idMeal, grams).subscribe(
          () => { this.loadProductsForMeal(this.idMeal); },
          (error) => console.error('Error adding product to meal:', error)
        );
      } else {
        alert('Wprowadź poprawną wartość dla gramów (liczbę większą od zera).');
      }
    }
  }
  
  removeProduct(product: Product) {
    this.mealsProductsService.removeProduct(product.id).subscribe(
      () => { this.loadProductsForMeal(this.idMeal); },
      (error) => console.error('Error removing product from meal:', error)
    );
  }
}
  











