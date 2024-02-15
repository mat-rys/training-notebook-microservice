import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from './note.model';
import { AuthService } from '../../security-config/auth.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  logoPath = "assets\\Training Notebook-logos.png";
  notesPath = "assets\\flat-lay-pink-sports-attributes-with-clipboard.jpg";
  notes: any[] = []; 
  editingNote: Note | null = null;
  token = this.authService.getToken();
  selectedDate: Date = new Date(); // początkowo wybieramy aktualną datę
  successMessage: string = ''; // Dodajemy pole successMessage

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  logout() {
    this.authService.removeToken();
  }

  changeDate(offset: number) {
    const currentDate = new Date(this.selectedDate.getTime()); // Głęboka kopia daty
    currentDate.setDate(currentDate.getDate() + offset);
    this.selectedDate = currentDate;
    this.loadNotes(); // Załaduj notatki na nowo na podstawie nowej daty
  }
  

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.value) {
      this.selectedDate = new Date(target.value); // Aktualizuj datę
      this.loadNotes(); // Załaduj notatki dla nowej daty
    }
  }
  
  

  loadNotes() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  
    // Pobierz datę w formacie yyyy-MM-dd
    const formattedDate = `${this.selectedDate.getFullYear()}-${this.selectedDate.getMonth() + 1}-${this.selectedDate.getDate()}`;
  
    // Konwertuj datę wybranej do UTC
    const selectedDateUTC = new Date(this.selectedDate.getTime() - this.selectedDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  
    // Wykonaj żądanie HTTP, aby pobrać notatki dla wybranej daty
    this.http.get<any[]>(`http://localhost:8222/notes/byUserId?date=${selectedDateUTC}`, { headers })
      .subscribe(data => {
        console.log('All notes:', data);
  
        // Filtruj notatki, aby wyświetlić tylko te, których data rozpoczęcia jest równa wybranej dacie
        const filteredNotes = data.filter(note => new Date(note.startDate).toISOString().split('T')[0] === selectedDateUTC);
        console.log('Filtered notes:', filteredNotes);
  
        // Sortuj notatki wg daty rozpoczęcia od godziny 0:00 do 24:00
        filteredNotes.sort((a, b) => {
          const dateA = new Date(a.startDate);
          const dateB = new Date(b.startDate);
          return dateA.getHours() - dateB.getHours() || dateA.getMinutes() - dateB.getMinutes();
        });
  
        this.notes = filteredNotes;
      });
  }
  

deleteNote(noteId: string) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });
  this.http.delete(`http://localhost:8222/notes/${noteId}`, { headers })
    .subscribe(() => {
      this.loadNotes();
      this.successMessage = 'Note deleted successfully'; // Ustawienie komunikatu o sukcesie
      // Usunięcie komunikatu o sukcesie po 3 sekundach
      setTimeout(() => {
        this.successMessage = '';
      }, 1000);
    }, error => {
      console.error('Error deleting note:', error);
    });
}


  deleteNoteConfirmation(noteId: string) {
    if (confirm('Czy na pewno chcesz usunąć tę notatkę?')) {
      this.deleteNote(noteId);
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  editNote(note: Note) {
    console.log('Edytuj notatkę:', note);
    this.editingNote = { ...note };
  }

  cancelEdit() {
    this.editingNote = null;
  }

  updateNote() {
    if (this.editingNote) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });

      this.http.put(`http://localhost:8222/notes/${this.editingNote.id}`, this.editingNote, { headers })
        .subscribe(response => {
          this.loadNotes();
          this.editingNote = null; // Zakończ tryb edycji
          this.successMessage = 'Note updated successfully'; // Ustawienie komunikatu o sukcesie
          // Usunięcie komunikatu o sukcesie po 3 sekundach
          setTimeout(() => {
            this.successMessage = '';
          }, 1000);
        }, error => {
          console.error('Error updating note:', error);
        });
    }
  }



}
