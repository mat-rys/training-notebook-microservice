import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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

  copyMeal(mealId: number, day: string, mealTime: string): Observable<Meals> {
    console.log(mealId);
    console.log(day);
    console.log(mealTime);

    // Upewnij się, że mealTime jest w formacie HH:mm:ss
    const formattedMealTime = this.formatTime(mealTime);

    const url = `http://localhost:8222/nutrition/products-meals/copy/${mealId}?day=${day}&mealTime=${formattedMealTime}`;
    return this.http.post<Meals>(url, {}, { headers: this.headers }); // Wysłanie pustego ciała, jeżeli nie jest wymagane
  }

  generateAiMealsOpinion(formattedDate: string): Observable<any> {
    const url = `http://localhost:8222/nutrition/ai/generate/meals/${formattedDate}`;
    return this.http.get(url, { headers: this.headers });
  }

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

  getDistinctDays(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8222/nutrition/meals/distinctDays', { headers: this.headers });
  }
  
  private formatTime(mealTime: string): string {
    // Funkcja formatująca czas do formatu HH:mm:ss
    const [hours, minutes] = mealTime.split(':');

    // Dodajemy sekundy jako 00
    const seconds = '00'; 
    return `${hours}:${minutes}:${seconds}`;
  }
}
