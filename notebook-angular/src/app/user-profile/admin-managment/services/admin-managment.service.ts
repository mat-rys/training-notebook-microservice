import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/security-config/auth.service';
import { Observable } from 'rxjs';
import { UserForAdminDetailsResponse } from '../models/user-for-admin.model';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class AdminManagmentService {

  private token = this.authService.getToken();
  private apiUrl = 'http://localhost:8222/account'; // URL API do Twojego backendu (zmień w razie potrzeby)

  constructor(private authService: AuthService, private http: HttpClient) { }

  // Tworzymy nagłówki z tokenem autoryzacyjnym
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  // Metoda do pobierania wszystkich użytkowników
  getAllUsers(): Observable<UserForAdminDetailsResponse[]> {
    return this.http.get<UserForAdminDetailsResponse[]>(`${this.apiUrl}/users`, { headers: this.getHeaders() });
  }

  // Metoda do usuwania użytkownika
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${userId}`, {
      headers: this.getHeaders(),
      responseType: 'text'  // Ustawienie odpowiedzi jako tekst (nie JSON)
    });
  }

  /**
   * Pobiera wszystkie sesje użytkowników
   */
  getAllUserSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiUrl}/admin/user/sessions`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Usuwa sesję użytkownika na podstawie sessionId
   * @param sessionId ID sesji do usunięcia
   */
  deleteSession(sessionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/session/${sessionId}`, {
      headers: this.getHeaders()
    });
  }

  /**
   * Aktualizuje status użytkownika (enabled/disabled)
   * @param userId ID użytkownika
   * @param enabled Status do ustawienia
   */
  updateUserStatus(userId: string, enabled: boolean): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/admin/user/${userId}/status`, null, {
      headers: this.getHeaders(),
      params: { enabled: enabled.toString() }
    });
  }
}
