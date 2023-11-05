import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from './note.model';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService,private http: HttpClient) { }
  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.loadNotes(headers);
  }
  logout() {
    this.authService.removeToken();
  }
  
  loadNotes(headers: HttpHeaders) {
    this.http.get<any[]>('http://localhost:8222/notes/byUserId', { headers })
      .subscribe(data => {
        this.notes = data;
      });
  }

  deleteNote(noteId: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.http.delete(`http://localhost:8222/notes/${noteId}`, { headers })
      .subscribe(() => {
        this.loadNotes(headers);
      }, error => {
        console.error('Błąd podczas usuwania notatki:', error);
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

  updateNote() {
    if (this.editingNote) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });

      this.http.put(`http://localhost:8222/notes/${this.editingNote.id}`, this.editingNote, { headers })
        .subscribe(response => {
          this.loadNotes(headers);
          this.editingNote = null; // Zakończ tryb edycji
        }, error => {
          console.error('Błąd podczas aktualizacji notatki:', error);
        });
    }
  }


  

}
