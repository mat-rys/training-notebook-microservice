import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap, map, switchMap, finalize } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenCookieName = 'auth_token';
  private refreshTokenCookieName = 'refresh_token';
  private tokenExpirationTimeCookieName = 'token_expiration_time';

  public isRefreshing = false; // Flaga wskazująca, czy trwa odświeżanie
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  // Pobieranie tokenu z ciasteczka
  getToken(): string | null {
    return this.cookieService.get(this.tokenCookieName) || null;
  }

  // Pobieranie refresh tokenu z ciasteczka
  getRefreshToken(): string | null {
    return this.cookieService.get(this.refreshTokenCookieName) || null;
  }

  // Ustawianie tokenu i refresh tokenu w ciasteczkach
  setToken(token: string, refreshToken: string, expiresIn: number): void {
    const currentTimeInPoland = new Date();
    const expirationTime = new Date(currentTimeInPoland.getTime() + expiresIn * 1000);
    this.cookieService.set(this.tokenCookieName, token, expiresIn / 60 / 60 / 24, '/');
    this.cookieService.set(this.refreshTokenCookieName, refreshToken, expiresIn / 60 / 60 / 24, '/');
    this.cookieService.set(this.tokenExpirationTimeCookieName, expirationTime.toISOString(), expiresIn / 60 / 60 / 24, '/');
  }

  // Usuwanie tokenów
  removeToken(): void {
    this.removeAllUserSessions().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Błąd podczas usuwania sesji użytkownika:', error);
        this.deleteCookies();
        this.router.navigate(['/login']);
      },
    });
    this.deleteCookies();
  }

  // Usuwanie ciasteczek
  private deleteCookies(): void {
    this.cookieService.delete(this.tokenCookieName, '/');
    this.cookieService.delete(this.refreshTokenCookieName, '/');
    this.cookieService.delete(this.tokenExpirationTimeCookieName, '/');
  }

  // Sprawdzanie, czy token jest nadal ważny
  isAuthenticated(): boolean {
    const currentTimeInPoland = new Date();
    const expirationTime = new Date(this.cookieService.get(this.tokenExpirationTimeCookieName));
    return expirationTime > currentTimeInPoland;
  }

  refreshAuthToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      console.error('Brak refresh tokenu');
      this.router.navigate(['/login']);
      return of(null);
    }
  
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', refreshToken);
    body.set('client_id', 'backend');
    body.set('client_secret', environment.clientSecret);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    return this.http.post<any>(environment.tokenUrl, body.toString(), { headers }).pipe(
      tap((response) => {
        if (response?.access_token && response?.refresh_token) {
          this.setToken(response.access_token, response.refresh_token, response.expires_in);
        } else {
          throw new Error('Niepoprawna odpowiedź serwera');
        }
      }),
      catchError((error) => {
        console.error('Błąd podczas odświeżania tokenu:', error);
        this.removeToken();
        return of(null);
      })
    );
  }

  
  

  checkAndRefreshToken(): Observable<boolean> {
    const tokenExpirationTime = new Date(this.cookieService.get(this.tokenExpirationTimeCookieName)).getTime();
    const currentTime = Date.now();
  
    if (tokenExpirationTime - 3 * 60 * 1000 < currentTime) {
      // Jeśli token zaraz wygaśnie, a odświeżanie już trwa, czekamy
      if (this.isRefreshing) {
        console.log('Odświeżanie tokenu już w toku, czekam na zakończenie...');
        return this.refreshTokenSubject.asObservable().pipe(
          switchMap((token) => token ? of(true) : of(false)),
          catchError(() => of(false)) // W przypadku błędu zwróć false
        );
      }
  
      // Zaznaczamy, że odświeżanie jest w toku, by uniknąć równoległych prób odświeżenia
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null); // Resetujemy stan
      return this.refreshAuthToken().pipe(
        tap((response) => {
          if (response?.access_token) {
            this.refreshTokenSubject.next(response.access_token); // Emitujemy nowy token
          } else {
            this.refreshTokenSubject.next(null); // Jeśli odświeżenie się nie powiodło, wylogowujemy
            this.removeToken();
          }
        }),
        map(() => true),
        catchError((error) => {
          console.error('Błąd podczas odświeżania tokenu:', error);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(null);
          this.removeToken();
          return of(false);
        }),
        finalize(() => {
          this.isRefreshing = false; // Kończymy odświeżanie
        })
      );
    }
    return of(true); // Token jest jeszcze ważny, nie musimy nic robić
  }
  
  
  
  
  
  
  

  // Usuwa wszystkie sesje użytkownika na serwerze
  removeAllUserSessions(): Observable<void> {
    const token = this.getToken();

    if (!token) {
      console.error('Brak tokenu do usunięcia sesji');
      return of(void 0);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<void>('http://localhost:8222/account/users/sessions', { headers }).pipe(
      catchError((error) => {
        console.error('Błąd podczas usuwania sesji użytkownika:', error);
        return of(void 0);
      })
    );
  }
}
