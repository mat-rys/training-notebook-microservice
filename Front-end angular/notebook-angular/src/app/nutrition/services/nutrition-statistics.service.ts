import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/security-config/auth.service';
import { Averages } from '../meals-statistics/models/averages.model';
import { Calories } from '../meals-statistics/models/calories-stats.model';
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
}



