import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../security-config/auth.service';
import { LogginUserService } from '../services/loggin-user.service';
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

  constructor(    private authService: AuthService ,private http: HttpClient,
      private router: Router, private logginUserService: LogginUserService) {
  }

  getToken() {
    const username = (document.querySelector('.username-field') as HTMLInputElement).value;
    const password = (document.querySelector('.password-field') as HTMLInputElement).value;
  
    if (!username || !password) {
      alert('Proszę wprowadź poprawne hasło lub login.');
      return;
    }
  
    this.logginUserService.getUserToken(username, password).subscribe({
      next: (response: any) => {
        this.accessToken = response.access_token;
        const refreshToken = response.refresh_token;
  
        if (this.accessToken && refreshToken) {
          // Store both tokens in authService
          this.authService.setToken(this.accessToken, refreshToken, response.expires_in);
          console.log('Access Token:', this.accessToken);
          console.log('Refresh Token:', refreshToken);
  
          // Redirect to a different route after successful login
          this.router.navigate(['/nutrition']);
        } else {
          console.error('Brak jednego z wymaganych tokenów w odpowiedzi.');
        }
      },
      error: (error) => {
        alert('Niepoprawne hasło lub login. Spróbuj ponownie.');
        console.error('Error logując się:', error);
      }
    });
  }  
}