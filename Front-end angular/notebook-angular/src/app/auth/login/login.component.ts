import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../security-config/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logoPath = "assets\\Training Notebook-logos_transparent.png";
  women_login = "assets\\women_training_phone.png";
  accessToken: string | undefined; // Zmienna, w której będziemy przechowywać token

  constructor(    private authService: AuthService ,private http: HttpClient,  private router: Router) {
  }

  getToken() {
    const username = (document.querySelector('.username-field') as HTMLInputElement).value;
    const password = (document.querySelector('.password-field') as HTMLInputElement).value;
  
    // Sprawdź, czy pola nazwy użytkownika i hasła nie są puste
    if (!username || !password) {
      alert('Please enter both username and password.');
      return; // Zakończ funkcję, jeśli pola są puste
    }
  
    const url = 'http://localhost:8191/auth/realms/training-notebook-microservice-realm/protocol/openid-connect/token';
  
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', 'password');
    body.set('client_id', 'backend');
    body.set('client_secret', '6aiXmUlE27BiMVUerHBVNCUTJs4ascMS');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    this.http.post(url, body.toString(), { headers }).subscribe((response: any) => {
      this.accessToken = response.access_token;
  
      if (this.accessToken) {
        this.authService.setToken(this.accessToken); // Zapisz token w usłudze
        console.log('Access Token:', this.accessToken);
        this.router.navigate(['/account']);
      }
    }, (error) => {
      // Obsłuż błąd logowania
      alert('Invalid username or password. Please try again.');
      console.error('Error logging in:', error);
    });
  }
  
  
}  