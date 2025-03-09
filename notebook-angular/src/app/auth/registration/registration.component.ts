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

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private registerUserService: RegisterUserService
  ) {}

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

    // Pobierz token admina przed rejestracją
    this.registerUserService.getAdminToken().subscribe({
      next: (response: any) => {
        const accessToken = response.access_token;

        if (accessToken) {
          this.registerUserService.registerUser(user, accessToken).subscribe({
            next: (response: any) => {
              console.log('User created:', response);
              this.router.navigate(['/login']);
            },
            error: (error) => {
              alert('Błąd rejestracji. Proszę sprawdź informacje i spróbuj ponownie.');
              console.error('Error registering user:', error);
            }
          });
        } else {
          console.error('Brak wymaganego tokena w odpowiedzi');
        }
      },
      error: (error) => {
        console.error('Błąd podczas pobierania tokenów:', error);
        alert('Nie udało się pobrać tokena. Proszę spróbować ponownie później.');
      }
    });
  }
}
