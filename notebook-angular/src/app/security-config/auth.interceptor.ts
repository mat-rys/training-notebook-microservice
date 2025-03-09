import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.checkAndRefreshToken().pipe(
      switchMap((isValid) => {
        const token = this.authService.getToken();

        if (isValid && token) {
          // Klonujemy zapytanie, dodając token w nagłówkach
          const cloned = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(cloned); // Kontynuujemy zapytanie z tokenem
        }
        return next.handle(req); // Jeśli token jest nieprawidłowy, nie dodajemy nagłówka
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Jeśli odpowiedź to 401 Unauthorized lub 403 Forbidden, wylogowujemy użytkownika
          this.authService.removeToken(); // Usuwamy token
          this.authService.removeAllUserSessions().subscribe({
            next: () => {
              console.log('Sesja użytkownika usunięta');
            },
            error: (err) => {
              console.error('Błąd podczas usuwania sesji użytkownika', err);
            },
          });
        }
        return throwError(() => error); // Zwracamy błąd dalej
      })
    );
  }
}
