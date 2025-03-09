import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../security-config/auth.service';
import { Observable } from 'rxjs';
import { BodyMeasurement } from '../profile-measurements/models/body-measurements.model';

@Injectable({
  providedIn: 'root'
})
export class AccountMeasurementService {
  private baseUrl = 'http://localhost:8222/body/measurements';
  private token = this.authService.getToken();

  constructor(private authService: AuthService, private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

   addMeasurement(measurement: BodyMeasurement): Observable<BodyMeasurement> {
    return this.http.post<BodyMeasurement>(`${this.baseUrl}/add`, measurement, { headers: this.getHeaders() });
  }

  getMeasurements(): Observable<BodyMeasurement[]> {
    return this.http.get<BodyMeasurement[]>(`${this.baseUrl}/user/userId`, { headers: this.getHeaders() });
  }

  updateMeasurement(measurement: BodyMeasurement): Observable<BodyMeasurement> {
    console.log(measurement)
    return this.http.put<BodyMeasurement>(`${this.baseUrl}/update`, measurement, { headers: this.getHeaders() });
  }

  deleteMeasurement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers: this.getHeaders() });
  }
}