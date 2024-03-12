import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../meal-add-products/models/product.model';
import { Meals } from '../meal-add-products/models/meals.model';
import { ProductMeal } from '../meal-add-products/models/product-meal.model'; // Importuj model ProductMeal
import { AuthService } from 'src/app/security-config/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MealsProductsService {
  private token = this.authService.getToken();
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient, private authService: AuthService) { }

  loadProducts(): Observable<Product[]> {
    const url = 'http://localhost:8222/nutrition/products';
    return this.http.get<Product[]>(url, { headers: this.headers });
  }

  deleteProduct(productId: number): Observable<void> {
    const url = `http://localhost:8222/nutrition/products/${productId}`;
    return this.http.delete<void>(url, { headers: this.headers });
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `http://localhost:8222/nutrition/products/${product.id}`;
    return this.http.put<Product>(url, product, { headers: this.headers });
  }

  loadProductsForMeal(mealId: number): Observable<Product[]> {
    const url = `http://localhost:8222/nutrition/products-meals/get-for-meal/${mealId}`;
    return this.http.get<Product[]>(url, { headers: this.headers });
  }

  updateMealTotals(mealId: number, updatedTotals: Meals): Observable<Meals> {
    const url = `http://localhost:8222/nutrition/meals/${mealId}`;
    return this.http.put<Meals>(url, updatedTotals, { headers: this.headers });
  }

  addSelectedProductToMeal(product: Product, mealId: number, grams: number): Observable<ProductMeal> {
    const productToAdd: ProductMeal = {
      title: product.title,
      calories: (grams / 100) * product.calories,
      grams: grams,
      carbs: (grams / 100) * product.carbs,
      protein: (grams / 100) * product.protein,
      fat: (grams / 100) * product.fat,
    };
    const url = `http://localhost:8222/nutrition/products-meals?mealId=${mealId}`;
    return this.http.post<ProductMeal>(url, productToAdd, { headers: this.headers });
}
  
  removeProduct(productId: number): Observable<void> {
    const url = `http://localhost:8222/nutrition/products-meals/${productId}`;
    return this.http.delete<void>(url, { headers: this.headers });
  }
}
