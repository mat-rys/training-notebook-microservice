import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security-config/auth.service'; 
import { AccountService } from '../../account/services/account-data.service';
import { AdminManagmentService } from '../services/admin-managment.service';
import { Session } from '../models/session.model';

@Component({
  selector: 'app-session-managments',
  templateUrl: './session-managments.component.html',
  styleUrl: './session-managments.component.css',
  providers: [AuthService]
})
export class SessionManagmentsComponent implements OnInit{

  sessions: Session[] = []; // Wszystkie sesje
  filteredSessions: Session[] = []; // Sesje po filtrowaniu
  searchTerm: string = ''; // Tekst wyszukiwania
  successMessage: string = ''; // Komunikat sukcesu
  errorMessage: string = ''; // Komunikat błędu

  constructor(private accountService: AccountService, private adminService: AdminManagmentService) { }

  ngOnInit(): void {
    this.loadSessions();
  }

  // Pobiera wszystkie sesje
  loadSessions(): void {
    this.adminService.getAllUserSessions().subscribe(
      (sessions) => {
        this.sessions = sessions;
        this.filteredSessions = sessions; // Domyślnie wszystkie sesje
      },
      () => {
        this.errorMessage = 'Nie udało się pobrać sesji użytkowników.';
      }
    );
  }

  // Filtrowanie sesji po nazwie użytkownika lub ID sesji
  filterSessions(): void {
    const search = this.searchTerm.toLowerCase();
    this.filteredSessions = this.sessions.filter(
      (session) =>
        session.username.toLowerCase().includes(search) ||
        session.id.toLowerCase().includes(search)
    );
  }

  // Formatuje timestamp na czytelną datę
  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Zwraca datę w lokalnym formacie
  }

  // Zwraca listę klientów jako tablicę
  getClients(clients: { [key: string]: string }): string[] {
    return Object.entries(clients).map(([key, value]) => `${key}: ${value}`);
  }


 // Zakończenie sesji (poprzednio: deleteSession)
  endSession(sessionId: string): void {
    if (confirm('Czy na pewno chcesz zakończyć tę sesję?')) {
      this.adminService.deleteSession(sessionId).subscribe(
        () => {
          // Usuwamy sesję z listy
          this.sessions = this.sessions.filter((session) => session.id !== sessionId);
          this.filteredSessions = this.filteredSessions.filter((session) => session.id !== sessionId);
          this.successMessage = 'Sesja została pomyślnie zakończona.';
          
          // Ukrywamy komunikat po 3 sekundach
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        () => {
          this.errorMessage = 'Nie udało się zakończyć sesji.';
        }
      );
    }
  }

}
