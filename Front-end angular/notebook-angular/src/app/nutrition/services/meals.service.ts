import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meals } from '../meals-list/models/meals.model';
import { Meal } from '../meals-list/models/meal.model';
import { AuthService } from 'src/app/security-config/auth.service';

@Injectable({
  providedIn: 'root'
})

export class MealsService {
  private token = this.authService.getToken();
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient, private authService: AuthService) { }

  loadMeals(formattedDate: string): Observable<Meals[]> {
    const url = `http://localhost:8222/nutrition/meals/${formattedDate}/userId`;
    return this.http.get<Meals[]>(url, { headers: this.headers });
  }

  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8222/nutrition/meals/${id}`, { headers: this.headers });
  }

  deleteProductsForMeal(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8222/nutrition/products-meals/delete-by-meal/${id}`, { headers: this.headers });
  }

  createMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>('http://localhost:8222/nutrition/meals', meal, { headers: this.headers });
  }

  updateMeal(id: number, updatedData: Meal): Observable<Meal> {
    return this.http.put<Meal>(`http://localhost:8222/nutrition/meals/mealEdit/${id}`, updatedData, { headers: this.headers });
  }
}
