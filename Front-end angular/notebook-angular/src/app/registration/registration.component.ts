import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  logoPath = "assets\\Training Notebook-logos_transparent.png";
  women_registration = "assets\\women_trainign.png";

  accessToken: string | undefined;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(    private authService: AuthService ,private http: HttpClient,  private router: Router) {
    this.getToken();
  }
  getToken() {
    const url = 'http://localhost:8191/auth/realms/master/protocol/openid-connect/token';
    const body = new URLSearchParams();
    body.set('username', 'admin');
    body.set('password', 'Pa55w0rd');
    body.set('grant_type', 'password');
    body.set('client_id', 'admin-cli');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    
    this.http.post(url, body.toString(), { headers }).subscribe((response: any) => {
      this.accessToken = response.access_token;
      if (this.accessToken) {
        this.authService.setToken(this.accessToken);
        // console.log('Access Token:', this.accessToken);
      }
    });
  }

  registerAccount() {
    const url = 'http://localhost:8191/auth/admin/realms/training-notebook-microservice-realm/users';
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      enabled: true,
      credentials: [
        {
          type: 'password',
          value: this.password,
          temporary: false
        }
      ]
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });

    this.http.post(url, user, { headers }).subscribe((response: any) => {
      console.log('User created:', response);
      this.router.navigate(['/login']);
    });
  }
}

