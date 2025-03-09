import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('Sprawdzam token w AuthGuard...');

    // Sprawdzamy, czy token jest nadal ważny, jeśli nie to próbujemy go odświeżyć
    return this.authService.checkAndRefreshToken().pipe(
      map((isValid) => {
        if (isValid) {
          return true; // Dostęp do chronionej trasy
        } else {
          console.warn('Token wygasł, przekierowanie do /login');
          this.authService.removeToken(); // Usuwamy token
          this.router.navigate(['/login']);
          return false; // Dostęp zablokowany
        }
      }),
      catchError((err) => {
        console.error('Błąd podczas sprawdzania tokenu w AuthGuard:', err);
        this.authService.removeToken(); // Usuwamy token
        this.router.navigate(['/login']);
        return of(false); // Dostęp zablokowany
      })
    );
  }
}
