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
      alert('Please enter both username and password.');
      return;
    }
  
    this.logginUserService.getUserToken(username, password).subscribe((response: any) => {
      this.accessToken = response.access_token;
  
      if (this.accessToken) {
        this.authService.setToken(this.accessToken);
        console.log('Access Token:', this.accessToken);
        this.router.navigate(['/account']);
      }
    }, (error) => {
      alert('Invalid username or password. Please try again.');
      console.error('Error logging in:', error);
    });
  }
}