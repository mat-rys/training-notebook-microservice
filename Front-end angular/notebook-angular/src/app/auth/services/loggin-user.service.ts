import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../security-config/auth.service';
import { environment } from '../../../environments/environment'; // Dodaj ten import

@Injectable({
  providedIn: 'root'
})
export class LogginUserService {
  private tokenUrl = environment.tokenUrl; // Użyj zmiennej środowiskowej

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUserToken(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', 'password');
    body.set('client_id', 'backend');
    body.set('client_secret', environment.clientSecret); // Użyj zmiennej środowiskowej

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.tokenUrl, body.toString(), { headers });
  }
}