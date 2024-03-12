import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/security-config/auth.service';
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

}



