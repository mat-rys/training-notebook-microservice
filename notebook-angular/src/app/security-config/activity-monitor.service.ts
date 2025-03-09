import { Injectable, NgZone } from '@angular/core';
import { AuthService } from './auth.service';

// ActivityMonitorService.ts
@Injectable({
  providedIn: 'root',
})
export class ActivityMonitorService {
  private timeout: any;

  constructor(private authService: AuthService, private zone: NgZone) {
    this.startMonitoring();
  }

  startMonitoring(): void {
    // Nasłuchujemy na interakcje z użytkownikiem
    ['click', 'mousemove', 'keydown'].forEach((event) => {
      window.addEventListener(event, () => this.resetTimer());
    });
    this.resetTimer();
  }

  private resetTimer(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.zone.run(() => {
        if (!this.authService.isRefreshing) {
          this.authService.checkAndRefreshToken().subscribe({
            next: (isValid) => {
              if (!isValid) {
                console.log('Token wygasł, usuwam...');
                this.authService.removeToken();
              }
            },
            error: (err) => {
              console.error('Błąd podczas odświeżania tokenu:', err);
              this.authService.removeToken();
            }
          });
        } else {
          console.log('Odświeżanie tokenu już trwa.');
        }
      });
    }, 3 * 60 * 1000); 
  }
}
