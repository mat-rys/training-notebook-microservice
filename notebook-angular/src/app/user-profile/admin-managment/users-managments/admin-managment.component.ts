import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security-config/auth.service'; 
import { AccountService } from '../../account/services/account-data.service';
import { UserForAdminDetailsResponse } from '../models/user-for-admin.model'; 
import { AdminManagmentService } from '../services/admin-managment.service';

@Component({
  selector: 'app-admin-managment',
  templateUrl: './admin-managment.component.html',
  styleUrls: ['./admin-managment.component.css'],
  providers: [AuthService]
})
export class AdminManagmentComponent implements OnInit {

  users: UserForAdminDetailsResponse[] = [];  // Tablica na użytkowników
  filteredUsers: UserForAdminDetailsResponse[] = []; // Tablica na przefiltrowanych użytkowników
  errorMessage: string = '';  // Zmienna na komunikat błędu
  successMessage: string = ''; // Zmienna na komunikat sukcesu
  searchQuery: string = '';  // Zmienna na wpisany tekst w wyszukiwarce
  showNotification: boolean = false;  // Zmienna do kontroli widoczności komunikatu

  constructor(private accountService: AccountService, private adminService: AdminManagmentService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = data;  // Ustawiamy początkowo przefiltrowanych użytkowników na wszystkich
      },
      (error) => {
        this.errorMessage = 'Błąd podczas ładowania użytkowników';
      }
    );
  }

  confirmDeleteUser(userId: string): void {
    // Potwierdzenie usunięcia użytkownika
    const confirmed = window.confirm('Czy na pewno chcesz usunąć tego użytkownika?');
    if (confirmed) {
      this.deleteUser(userId);
    }
  }

  deleteUser(userId: string): void {
    this.adminService.deleteUser(userId).subscribe(
      (response) => {
        console.log('User deleted successfully:', response);  // Logowanie odpowiedzi
  
        // Usuwamy użytkownika z listy lokalnej, jeśli operacja zakończyła się sukcesem
        this.users = this.users.filter(user => user.userId !== userId);
        this.filteredUsers = this.filteredUsers.filter(user => user.userId !== userId);

        // Ustawiamy komunikat o sukcesie
        this.successMessage = 'Użytkownik usunięty pomyślnie!';

        // Ukrywamy komunikat po 3 sekundach
        setTimeout(() => {
          this.successMessage = ''; // Czyścimy komunikat
        }, 3000);  // Po 3 sekundach komunikat zniknie
      },
      (error) => {
        this.errorMessage = 'Błąd podczas usuwania użytkownika';
      }
    );
  }
  
  // Metoda do filtrowania użytkowników
  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.searchQuery = query;

    // Opóźnienie wyszukiwania o 1 sekundę po przestaniu pisać
    setTimeout(() => {
      if (this.searchQuery) {
        this.filteredUsers = this.users.filter(user => 
          user.userId.toLowerCase().includes(this.searchQuery) ||
          user.email.toLowerCase().includes(this.searchQuery) ||
          user.firstName.toLowerCase().includes(this.searchQuery) ||
          user.lastName.toLowerCase().includes(this.searchQuery) ||
          user.username.toLowerCase().includes(this.searchQuery)
        );
      } else {
        this.filteredUsers = this.users;  // Jeśli nie ma zapytania, pokazujemy wszystkich użytkowników
      }
    }, 1000);
  }

  toggleUserStatus(user: UserForAdminDetailsResponse): void {
    const newStatus = !user.enabled; // Przełączamy obecny stan
    this.adminService.updateUserStatus(user.userId, newStatus).subscribe(
      () => {
        user.enabled = newStatus; // Aktualizujemy stan w tabeli
        const statusText = newStatus ? 'aktywny' : 'nieaktywny';
        this.successMessage = `Użytkownik ${user.username} został ${statusText}.`;
  
        // Ukrywamy komunikat po 3 sekundach
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      (error) => {
        this.errorMessage = `Nie udało się zaktualizować statusu użytkownika ${user.username}.`;
      }
    );
  }
  
}
