import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../security-config/auth.service';
import { Router } from '@angular/router';
import { RegisterUserService } from '../services/register-user.service';

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

  constructor(private authService: AuthService, private http: HttpClient,
     private router: Router,private registerUserService: RegisterUserService) {
    this.getAdminToken();
  }

  getAdminToken() {
    this.registerUserService.getAdminToken().subscribe((response: any) => {
      this.accessToken = response.access_token;
      if (this.accessToken) {
        this.authService.setToken(this.accessToken);
      }
    });
  }

  registerAccount() {
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
  
    if (this.accessToken) {
      this.registerUserService.registerUser(user, this.accessToken).subscribe((response: any) => {
        console.log('User created:', response);
        this.router.navigate(['/login']);
      }, (error) => {
        alert('Registration failed. Please check your information and try again.');
        console.error('Error registering user:', error);
      });
    } else {
      console.error('Error: Access token is undefined.');
    }
  }
  
}