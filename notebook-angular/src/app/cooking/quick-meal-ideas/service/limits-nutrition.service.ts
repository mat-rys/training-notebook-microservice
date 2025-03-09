import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/security-config/auth.service';
import { Product } from '../model/product.model';
import { MealAdvice } from '../model/meal-advice.model';
import { Meal } from '../model/meal.model';
import { Meals } from 'src/app/nutrition/meal-add-products/models/meals.model';

@Injectable({
  providedIn: 'root'
})
export class LimitsNutritionService {
  private apiUrl = 'http://localhost:8222/nutrition'; // Główny URL API
  private token = this.authService.getToken();
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient, private authService: AuthService) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  loadProducts(): Observable<Product[]> {
    const url = `${this.apiUrl}/products`; // URL do pobierania produktów
    return this.http.get<Product[]>(url, { headers: this.headers });
  }

  sendMealAdvice(mealAdvice: MealAdvice): Observable<{ mealIdea: string }> {
    const url = `${this.apiUrl}/ai/generate/cooking-idea`; // Endpoint do generowania porady
    return this.http.post<{ mealIdea: string }>(url, mealAdvice, { headers: this.headers });
  }

  saveMeal(mealData: Meal): Observable<any> {
    const url = `${this.apiUrl}/products-meals/add-meal-recipe`; // Endpoint do dodawania posiłku
    return this.http.post<any>(url, mealData, { headers: this.headers });
  }
}

