import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/security-config/auth.service';
import { AdviceResponse } from '../meals-statistics/models/advice-responce.model';
import { Averages } from '../meals-statistics/models/averages.model';
import { Calories } from '../meals-statistics/models/calories-stats.model';
import { DailyPercentageNutritionDTO } from '../meals-statistics/models/DailyPercentageNutritionDTO.model';
import { MealTimeDTO } from '../meals-statistics/models/meal-time-dto.model';
import { MostUsedProducts } from '../meals-statistics/models/mostUsedProducts.model';

@Injectable({
  providedIn: 'root'
})
export class NutritionStatisticsService {
  private token = this.authService.getToken();
  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient, private authService: AuthService) { }

  generateAdvice(statistics: string, personalInformation: string): Observable<AdviceResponse> {
    const url = `http://localhost:8222/nutrition/ai/generate/statistics/ai?statistics=${encodeURIComponent(statistics)}&personalInformation=${encodeURIComponent(personalInformation)}`;

    return this.http.get<AdviceResponse>(url, { headers: this.headers });
  }

  getMealStats(startDate: string, endDate: string): Observable<MostUsedProducts[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<MostUsedProducts[]>('http://localhost:8222/nutrition/products-meals/user-stats', { headers: this.headers, params });
  }

  getAverageNutrients(startDate: string, endDate: string): Observable<Averages[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<Averages[]>('http://localhost:8222/nutrition/meals/average', { headers: this.headers, params });
  }

  getSumCaloriesByUserIdAndDateRange(startDate: string, endDate: string): Observable<Calories[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<Calories[]>('http://localhost:8222/nutrition/meals/sumCalories', { headers: this.headers, params });
  }

  getMealStatsByDayInPercentage(startDate: string, endDate: string): Observable<DailyPercentageNutritionDTO[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<DailyPercentageNutritionDTO[]>('http://localhost:8222/nutrition/meals/percentageNutritionByDay', { headers: this.headers, params });
  }

  getMealTimesStats(startDate: string, endDate: string): Observable<MealTimeDTO[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    
    return this.http.get<MealTimeDTO[]>('http://localhost:8222/nutrition/meals/mealTimesStatistics', { headers: this.headers, params });
  }
}



