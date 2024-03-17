import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Limits } from '../limits/models/limits.model';
import { AuthService } from 'src/app/security-config/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LimitsNutritionService {

  private token = this.authService.getToken();

  constructor(private authService: AuthService, private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  loadLimitsProfile(): Observable<Limits> {
    return this.http.get<Limits>('http://localhost:8222/body/limits', { headers: this.getHeaders() });
  }

  updateLimitsProfile(fieldName: string, updatedValue: any): Observable<Limits> {
    console.log(fieldName,updatedValue,"hej")
    const apiEndpoint = `http://localhost:8222/body/limits/${fieldName}`;
    const limitsProfileDTO = {[fieldName]: updatedValue};
    return this.http.put<Limits>(apiEndpoint, limitsProfileDTO, { headers: this.getHeaders() });
}

  createLimits(limitsProfile: Limits): Observable<Limits> {
    return this.http.post<Limits>('http://localhost:8222/body/limits/post', limitsProfile, { headers: this.getHeaders() });
  }
}
